import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Домики не удалось загрузить');
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Создание домика/ редактирование домика
  let query = supabase.from('cabins');
  //а) Создание
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //б) Редактирование
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Домик не удалось создать');
  }
  //2. Загрузка изображения
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //3. Удалить домик Если произошла ошибка в момент загрузки изображения
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(error);
    throw new Error(
      'Изображение домика не удалось загрузить и домик не был создан',
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Домик не может быть удалить');
  }
  return data;
}

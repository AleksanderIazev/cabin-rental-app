import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { createCabin } from '../../services/apiCabins';
import { useForm } from 'react-hook-form';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  ////////

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Новый домик успешно создан');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError() {
    // console.log(error)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disable={isCreating}
          {...register('name', {
            required: 'Поле обязательно к заполнению',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disable={isCreating}
          {...register('maxCapacity', {
            required: 'Поле обязательно к заполнению',
            min: {
              value: 1,
              message: 'Кол-во людей должно быть не менее 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disable={isCreating}
          {...register('regularPrice', {
            required: 'Поле обязательно к заполнению',
            min: {
              value: 1,
              message: 'Кол-во людей должно быть не менее 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disable={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'Поле обязательно к заполнению',
            validate: value =>
              value <= getValues().regularPrice ||
              'Дискаунт должен быть меньше обычной цены',
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        disable={isCreating}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disable={isCreating}
          {...register('description', {
            required: 'Поле обязательно к заполнению',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: 'Поле обязательно к заполнению',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

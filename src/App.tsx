import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocalStorage } from 'react-use';
import { z } from 'zod';
import { Expenses, Income } from './components';

const entrySchema = z.object({
  label: z.string(),
  value: z.number(),
});

const formDataSchema = z.object({
  income: z.array(entrySchema),
  expenses: z.array(entrySchema),
});

type FormData = z.infer<typeof formDataSchema>;

const defaultValues = {
  income: [
    {
      label: 'Salary',
      value: 3000,
    },
  ],
  expenses: [
    {
      label: 'Rent',
      value: 1000,
    },
  ],
} satisfies FormData;

function App() {
  const [value, setValue] = useLocalStorage('budget', defaultValues);
  const methods = useForm({
    defaultValues: value,
    resolver: zodResolver(formDataSchema),
  });

  function onSubmit(data: FormData) {
    console.log({ data });
    setValue(data);
  }

  return (
    <div>
      <h1>Budget Tracker</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Income />
          <Expenses />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default App;

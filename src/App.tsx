import { zodResolver } from '@hookform/resolvers/zod';
import { sumBy } from 'lodash-es';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'react-use';
import { z } from 'zod';
import { Expenses, Income } from './components';
import { currency } from './i18n';

const entrySchema = z.object({
  label: z.string(),
  value: z.number().nonnegative(),
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
  const { t } = useTranslation();
  const { handleSubmit, watch } = methods;

  function onSubmit(data: FormData) {
    console.log({ data });
    setValue(data);
  }

  const [totalIncome, totalExpenses] = watch(['income', 'expenses']).map((entries) =>
    sumBy(entries, 'value'),
  );

  return (
    <div>
      <h1>Budget Tracker</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Income total={totalIncome} />
          <Expenses total={totalExpenses} />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </FormProvider>
      <div>Budget: {t('intlCurrency', { val: totalIncome - totalExpenses, currency })}</div>
    </div>
  );
}

export default App;

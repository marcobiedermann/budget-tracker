import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { currency } from '../../i18n';

interface Income {
  label: string;
  value: number;
}

interface FieldValues {
  income: Income[];
}

interface IncomeProps {
  total: number;
}

function Income(props: IncomeProps) {
  const { total } = props;
  const { control, register } = useFormContext<FieldValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'income',
  });
  const { t } = useTranslation();

  return (
    <section>
      <h2>Income ({t('intlCurrency', { val: total, currency })})</h2>
      <ul>
        {fields.map((field, index) => (
          <li key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              id={field.id}
              min="0"
              type="number"
              {...register(`income.${index}.value`, {
                min: 0,
                valueAsNumber: true,
              })}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ label: `Income #${fields.length + 1}`, value: 0 })}
      >
        Add
      </button>
    </section>
  );
}

export default Income;

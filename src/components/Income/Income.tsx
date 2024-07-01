import { useFieldArray, useFormContext } from 'react-hook-form';

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

  return (
    <section>
      <h2>Income ({total})</h2>
      <ul>
        {fields.map((field, index) => (
          <li key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              id={field.id}
              type="number"
              {...register(`income.${index}.value`, {
                valueAsNumber: true,
              })}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => append({ label: 'Income', value: 0 })}>
        Add
      </button>
    </section>
  );
}

export default Income;

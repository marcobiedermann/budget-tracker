import { useFieldArray, useFormContext } from 'react-hook-form';

interface Expense {
  label: string;
  value: number;
}

interface FieldValues {
  expenses: Expense[];
}

function Expenses() {
  const { control, register } = useFormContext<FieldValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expenses',
  });

  return (
    <section>
      <h2>Expenses</h2>
      <ul>
        {fields.map((field, index) => (
          <li key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              id={field.id}
              type="number"
              {...register(`expenses.${index}.value`, {
                valueAsNumber: true,
              })}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => append({ label: 'Expense', value: 0 })}>
        Add
      </button>
    </section>
  );
}

export default Expenses;

export default function TodoForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" placeholder="Name" />
      <button>Add</button>
    </form>
  );
}

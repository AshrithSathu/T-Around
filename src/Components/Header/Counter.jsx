export default function Counter({ numberOfItemsPacked, totalNumberOfItems }) {
  if (totalNumberOfItems === 0) {
    return <p>Start Packing</p>;
  }
  return (
    <p>
      <b>{numberOfItemsPacked}</b> /{totalNumberOfItems} items packed
    </p>
  );
}

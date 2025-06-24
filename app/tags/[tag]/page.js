export default async function TagsPage({ params }) {
  const { tag } = await params;

  return <h1>{tag}</h1>;
}

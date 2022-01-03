import Container from "../components/Container";
import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout middleware={'auth'} title="Dashboard">
      <Container>
        <h1 className="text-xl font-semibold mb-2">Dashboard</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nisi libero quas perspiciatis commodi. Quas laudantium rerum tenetur, quod nihil dolore totam, accusamus perferendis quae sint dignissimos impedit, numquam blanditiis?
      </Container>
    </Layout>
  )
}

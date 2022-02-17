import Container from '../../components/admin/';
import ProductHistoryTable from 'components/tables/ProductHistoryTable';

export default function ProductHistoryPage() {
  return (
    <Container>
      <h2 className='text-4xl font-medium mb-2'>Product History</h2>
      <ProductHistoryTable />
    </Container>
  );
}

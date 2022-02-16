import Container from '../../components/admin/';
import TransactionTable from 'components/tables/TransactionTable';

export default function TransactionPage() {
  return (
    <Container>
      <h2 className='text-4xl font-medium mb-2'>Transaction</h2>
      <TransactionTable />
    </Container>
  );
}

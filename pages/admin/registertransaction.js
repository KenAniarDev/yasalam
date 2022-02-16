import Container from '../../components/admin/';
import RegisterTransaction from 'components/tables/RegisterTransaction';

export default function RegisterTransactionPage() {
  return (
    <Container>
      <h2 className='text-4xl font-medium mb-2'>Register Transaction</h2>
      <RegisterTransaction />
    </Container>
  );
}

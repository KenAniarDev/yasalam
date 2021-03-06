import { useEffect, useState } from 'react';
import Container from '../../components/admin/';
import { useStore } from '../../components/admin/';
import {
  getAllMembers,
  getOutlets,
  getAllRegisterTransactions,
  getAllTransactions,
  getAllVisits,
} from '../../utils/firebase';
import toast from 'react-hot-toast';
import DashboardCard from 'components/card/DashboardCard';
import DashboardCardColored from 'components/card/DashboardCardColored';
import DashboardNationality from 'components/tables/DashboardNationality';
import DashboardOutlets from 'components/tables/DashboardOutlets';

function PageContent(user) {
  const [outlets, setOutlets] = useState([]);
  const [members, setMembers] = useState([]);
  const [registerTransactions, setRecentTranscations] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(false);

  const [guestMembersCount, setGuestMembersCount] = useState(0);
  const [individualMembersCount, setIndividualMembersCount] = useState(0);
  const [familyMembersCount, setFamilyMembersCount] = useState(0);
  const [maleMembersCount, setMaleMembersCount] = useState(0);
  const [femaleMembersCount, setFemaleMembersCount] = useState(0);
  const [membershipRegistrationEarnings, setMembershipRegistrationEarnings] =
    useState(0);
  const [membershipsSpent, setmembershipsSpent] = useState(0);
  const [membershipSavings, setMembershipSavings] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const memberData = await getAllMembers();
      const OutletData = await getOutlets();
      const registerTransactionData = await getAllRegisterTransactions();
      const transactionData = await getAllTransactions();
      const visitData = await getAllVisits();

      setMembers(memberData);
      setOutlets(OutletData);
      setRecentTranscations(registerTransactionData);
      setTransactions(transactionData);
      setVisits(visitData);

      // console.log('memberData', memberData.length);
      // console.log('OutletData', OutletData.length);
      // console.log('registerTransactionData', registerTransactionData.length);
      // console.log('transactionData', transactionData.length);
      // console.log('visitData', visitData.length);
      memberData.forEach((member) => {
        if (member.userType === 'guest')
          setGuestMembersCount(guestMembersCount++);
        if (member.userType === 'individual')
          setIndividualMembersCount(individualMembersCount++);
        if (member.userType === 'family' || member.userType === 'secondary')
          setFamilyMembersCount(familyMembersCount++);
        if (member.gender === 'male') setMaleMembersCount(maleMembersCount++);
        if (member.gender === 'female')
          setFemaleMembersCount(femaleMembersCount++);

        setMembershipSavings(membershipSavings + member.savings);
      });

      registerTransactionData.forEach((transaction) => {
        setMembershipRegistrationEarnings(
          membershipRegistrationEarnings + transaction.amountPaid
        );
      });

      setmembershipsSpent(membershipRegistrationEarnings);
      transactions.forEach((transaction) => {
        setmembershipsSpent(membershipsSpent + transaction.totalPrice);
      });

      toast.success('Data fetching success!');
    } catch (error) {
      console.log(error);
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      setOutlets([]);
      setMembers([]);
      setRecentTranscations([]);
      setTransactions([]);
      setVisits([]);
    };
  }, []);

  return (
    <>
      {' '}
      <h2 className='text-4xl font-medium mb-2 mr-2'>Dashboard</h2>
      {!loading && (
        <>
          <div className='mb-4'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <DashboardCard
                title='Total Number of Members'
                value={members.length}
                icon='fad fa-users'
              />
              <DashboardCard
                title='Total Number of Guest Members'
                value={guestMembersCount}
                icon='fad fa-user-secret'
              />
              <DashboardCard
                title='Total Number of Individual Members'
                value={individualMembersCount}
                icon='fad fa-user'
              />
              <DashboardCard
                title='Total Number of Family Members'
                value={familyMembersCount}
                icon='fad fa-user-friends'
              />
              <DashboardCard
                title='Total Number of Male Members'
                value={maleMembersCount}
                icon='fad fa-male'
              />
              <DashboardCard
                title='Total Number of Female Members'
                value={femaleMembersCount}
                icon='fad fa-female'
              />
              <DashboardCard
                title='Total Number of Visits'
                value={visits.length}
                icon='fad fa-person-booth'
              />
              <DashboardCard
                title='Total Number of Transactions'
                value={transactions.length}
                icon='fad fa-money-bill-alt'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4'>
            <DashboardCardColored
              title='Total Membership Registration Earnings'
              value={(
                Math.round(membershipRegistrationEarnings * 100) / 100
              ).toFixed(2)}
              icon='fad fa-money-bill-alt'
            />

            <DashboardCardColored
              title='Total Memberships Spent'
              value={(Math.round(membershipsSpent * 100) / 100).toFixed(2)}
              icon='fad fa-money-bill-alt'
            />
            <DashboardCardColored
              title='Total Membership Savings'
              value={(Math.round(membershipSavings * 100) / 100).toFixed(2)}
              icon='fad fa-money-bill-alt'
            />
          </div>

          <div className='overflow-x-auto'>
            {members.length > 0 && (
              <DashboardNationality memberData={members} />
            )}
          </div>

          <div className='mt-4'>
            <h2 className='text-2xl'>Outlets Info</h2>
            <div className='overflow-x-auto'>
              <DashboardOutlets
                outlets={outlets}
                transactions={transactions}
                visits={visits}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function DashboardPage() {
  const user = useStore((state) => state.user);

  return (
    <Container>
      <PageContent user={user} />
    </Container>
  );
}

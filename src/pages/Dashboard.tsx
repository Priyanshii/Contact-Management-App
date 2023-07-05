
import Chart from '../components/Chart';
import Map from '../components/Map';

const Dashboard = () => {

  return (
    <div className='h-[100vh] flex flex-col items-center gap-10' >
      <Chart />
      <Map />
    </div>
  )
}

export default Dashboard
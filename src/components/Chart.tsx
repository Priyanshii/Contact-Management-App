import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, YAxis, ResponsiveContainer } from "recharts";

const Chart = () => {

  const { isLoading, error, data } = useQuery({queryKey: ["covidCases"], queryFn:() =>
    axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    ).then((res) => res.data).then((res) => getCovidCasesFluctuations(res.cases))
  });
  
  const getCovidCasesFluctuations = (data:any) =>{
    let prev = 0;
    console.log(data);
    console.log(Object.entries(data));
    
    const newData = Object.entries(data)?.reduce((acc:any, current:any) => {
      acc.push({date: current[0], value: Math.abs(current[1]-prev)})
      prev = current[1];
      return acc;
    },[])
    return newData;
  }

  if (isLoading) return <div className='w-[90%] h-[70%]'>Loading...</div>;

  if (error) return <div>An error has occurred</div>;

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
            <XAxis dataKey="date" />
            <YAxis type='number' domain={[0, 'dataMax']} tickCount={10}/>
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="value" stroke="#db3416" yAxisId={0}/>
          </LineChart>
        </ResponsiveContainer>
        <div>Above graph shows the number of cases occured all over the World (y-axis) on the date mentioned (x-axis)</div>
    </>
  )
}

export default Chart;

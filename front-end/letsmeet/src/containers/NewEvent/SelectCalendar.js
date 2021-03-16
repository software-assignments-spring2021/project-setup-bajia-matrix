import { Calendar, DateObject } from 'react-multi-date-picker';
import { DatePanel } from 'react-multi-date-picker/plugins';
import { Button } from 'antd';


export default function SelectCalendar({selectedDates, setSelectedDates}) {
  function handleToday() {
    const today = new DateObject();
    setSelectedDates([...selectedDates, today]);
  }
  return (
    <Calendar
      onlyShowInRangeDates={true}
      minDate={new Date()}
      value={selectedDates}
      onChange={setSelectedDates}
      plugins={[<DatePanel />]}
      multiple
      sort
    >
      <Button style={{ margin: "5px" }} onClick={() => setSelectedDates([])}>
        Clear
      </Button>

      <Button style={{ margin: "5px" }} onClick={handleToday}>
        Today
      </Button>
    </Calendar>
  );
}
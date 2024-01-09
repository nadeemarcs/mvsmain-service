import * as React from "react";
import Paper from "@material-ui/core/Paper";
import "./calendar.css";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

function calendar() {
  return (
    <>
      <div style={{ margin: "10px 10px" }}>
        <Paper style={{}}>
          <Scheduler
          //   data={data}
          >
            <ViewState defaultCurrentDate="2021-10-19" />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
          </Scheduler>
        </Paper>
      </div>
    </>
  );
}
export default calendar;

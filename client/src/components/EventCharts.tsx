import { DatePicker } from "antd";
import { RangePickerValue } from "antd/lib/date-picker/interface";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { AppStore } from "src/store/appStore";

const EventCharts = inject("appStore")(
  observer(({ appStore }: { appStore?: AppStore }) => {
    if (!appStore) {
      return null;
    }
    const [dateRange, setDateRange] = useState<[string, string]>([
      moment()
        .subtract(30, "minutes")
        .toISOString(),
      moment().toISOString(),
    ]);

    useEffect(() => {
      appStore.getAnalytics(
        appStore.self?.appCode || "demo",
        dateRange[0],
        dateRange[1]
      );
    }, [dateRange]);

    const commonLineChartOptions = {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              displayFormats: {
                minute: "HH:mm",
              },
              min: dateRange[0],
              max: dateRange[1],
            },
            distribution: "linear",
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: (label: string) => label + "s",
            },
          },
        ],
      },
    };

    const fcpChartData = appStore.analytics?.fcps.map((fcp) => ({
      x: new Date(fcp.createdAt),
      y: fcp.value,
    }));
    const domLoadChartData = appStore.analytics?.domLoads.map((domLoad) => ({
      x: new Date(domLoad.createdAt),
      y: domLoad.value,
    }));
    const ttfbChartData = appStore.analytics?.ttfbs.map((ttfb) => ({
      x: new Date(ttfb.createdAt),
      y: ttfb.value,
    }));
    const windowLoadChartData = appStore.analytics?.windowLoads.map(
      (windowLoad) => ({
        x: new Date(windowLoad.createdAt),
        y: windowLoad.value,
      })
    );

    const handleDateRangeChange = (dates: RangePickerValue) => {
      if (dates[0] && dates[1]) {
        setDateRange([
          dates[0]?.toISOString() as string,
          dates[1]?.toISOString() as string,
        ]);
      }
    };

    return (
      <>
        <div className="event-charts__date-range-picker flex-row flex--centered">
          <DatePicker.RangePicker
            onChange={handleDateRangeChange}
            showTime={true}
            allowClear={false}
            defaultValue={[moment().subtract(30, "minutes"), moment()] as any}
            ranges={
              {
                "Last 1 hour": [moment().subtract(1, "hour"), moment()],
                "Last 6 hours": [moment().subtract(6, "hours"), moment()],
                "Last 1 day": [moment().subtract(1, "day"), moment()],
              } as any
            }
            style={{ width: "420px" }}
          />
        </div>
        <div className="event-charts__line-chart">
          <Line
            data={{
              datasets: [
                {
                  label: "FCP",
                  data: fcpChartData,
                  lineTension: 0,
                  backgroundColor: "rgb(0,245,212,0.65)",
                },
              ],
            }}
            options={commonLineChartOptions}
          />
        </div>
        <div className="event-charts__line-chart">
          <Line
            data={{
              datasets: [
                {
                  label: "Dom Load",
                  data: domLoadChartData,
                  lineTension: 0,
                  backgroundColor: "rgb(82,188,249,0.65)",
                },
              ],
            }}
            options={commonLineChartOptions}
          />
        </div>
        <div className="event-charts__line-chart">
          <Line
            data={{
              datasets: [
                {
                  label: "TTFB",
                  data: ttfbChartData,
                  lineTension: 0,
                  backgroundColor: "rgb(229,103,181,0.65)",
                },
              ],
            }}
            options={commonLineChartOptions}
          />
        </div>

        <div className="event-charts__line-chart">
          <Line
            data={{
              datasets: [
                {
                  label: "Window Load",
                  data: windowLoadChartData,
                  lineTension: 0,
                  backgroundColor: "rgb(157,105,229,0.65)",
                },
              ],
            }}
            options={commonLineChartOptions}
          />
        </div>
      </>
    );
  })
);

export default EventCharts;

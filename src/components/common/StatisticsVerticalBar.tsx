import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Spinner } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface Props {
  searchTerm: string;
  searchTermStatistics: any;
}

const StatisticsVerticalBar = (props: Props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const statisticData: number[] = [];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "{{searchString}}",
      },
    },
  };

  const labels = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  let jan = 0;
  let feb = 0;
  let march = 0;
  let april = 0;
  let may = 0;
  let june = 0;
  let july = 0;
  let august = 0;
  let september = 0;
  let october = 0;
  let november = 0;
  let december = 0;

  const data = {
    labels,
    datasets: [
      {
        label: "Annonser relaterat till " + props.searchTerm,
        data: statisticData,
        backgroundColor: "rgba(39, 38, 53, .8)",
      },
    ],
  };

  return (
    <div style={{ textAlign: "center" }}>
      {props.searchTermStatistics.length === 0 ? (
        <div>
          <p>Hämtar statistik</p>
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          {props.searchTermStatistics === null ||
          props.searchTermStatistics === undefined ? null : (
            <div>
              {props.searchTermStatistics.map((stats: any) => {
                // Convert to Date Object
                let date = new Date(stats.date);

                // Based on month, we want to append to selected index in statisticData
                switch (date.getMonth()) {
                  case 0: {
                    jan += stats.count;
                    break;
                  }
                  case 1: {
                    feb += stats.count;
                    break;
                  }
                  case 2: {
                    march += stats.count;
                    break;
                  }
                  case 3: {
                    april += stats.count;
                    break;
                  }
                  case 4: {
                    may += stats.count;
                    break;
                  }
                  case 5: {
                    june += stats.count;
                    break;
                  }
                  case 6: {
                    july += stats.count;
                    break;
                  }
                  default: {
                    break;
                  }
                }
              })}
              <p style={{ fontSize: "0" }}>
                {/* For some reason, JSX tries to write out the lenght of the array here without making the text.. invisiable... tell me whyyyyyy */}
                {statisticData.push(
                  jan,
                  feb,
                  march,
                  april,
                  may,
                  june,
                  july,
                  august,
                  september,
                  october,
                  november,
                  december
                )}
              </p>
              <Bar options={options} data={data} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatisticsVerticalBar;

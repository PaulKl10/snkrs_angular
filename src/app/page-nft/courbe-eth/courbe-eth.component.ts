import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiEthService } from 'src/app/services/apiEth/api-eth.service';

@Component({
  selector: 'app-courbe-eth',
  templateUrl: './courbe-eth.component.html',
  styleUrls: ['./courbe-eth.component.css']
})
export class CourbeEthComponent implements OnInit {

  constructor(private apiEth: ApiEthService) { }

  ngOnInit() {
    this.loadDataAndDrawChart();
  }

  loadDataAndDrawChart() {
    this.apiEth.loadData().subscribe(
      (data) => {
        const labels: any[] = [];
        const prices: any[] = [];
        data.Data.Data.forEach(function (item: any) {
          const date = new Date(item.time * 1000);
          const formattedDate = date.toLocaleString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' });
          labels.push(formattedDate);
          prices.push(item.close);
        });

        const chartElement = document.getElementById("myChart") as HTMLCanvasElement;
        if (chartElement) {
          const ctx = chartElement.getContext("2d");
          if (ctx) {
            new Chart(ctx, {
              type: "line",
              data: {
                labels: labels,
                datasets: [
                  {
                    data: prices,
                    label: "ETH",
                    borderColor: "#FF6165",
                    backgroundColor: "#173E70",
                    fill: false
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    title: {
                      display: true,
                      text: "Prix en EUR"
                    }
                  },
                  x: {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 20
                    }
                  }
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Evolution du cours de l'ETH en EUR sur les 7 derniers jours (Mis à jour à 23H)",
                    font: {
                      size: 18,
                      family: "Kodchasan"
                    }
                  },
                  legend: {
                    labels: {
                      font: {
                        family: "Kodchasan"
                      }
                    }
                  }
                }
              }
            });
          } else {
            console.error("Failed to get 2D context for canvas element.");
          }
        } else {
          console.error("Element with ID 'myChart' not found.");
        }
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiEthService } from 'src/app/services/apiEth/api-eth.service';

@Component({
  selector: 'app-courbe-eth',
  templateUrl: './courbe-eth.component.html',
  styleUrls: ['./courbe-eth.component.css']
})
export class CourbeEthComponent implements OnInit {

  private labels!: any[];
  private prices!: any[];

  constructor(private apiEth: ApiEthService) { }

  ngOnInit() {
    this.loadData();
    this.scheduleDailyUpdate();
  }

  scheduleDailyUpdate() {
    // Déterminez l'heure à laquelle vous souhaitez que la mise à jour se produise (23h)
    const targetHour = 23;

    setInterval(() => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      if (currentHour === targetHour) {
        // Appel à l'API et mise à jour du graphique
        this.loadData();
      }
    }, 60 * 60 * 1000); // Vérification toutes les heures
  }

  loadData() {
    this.labels = [];
    this.prices = [];
    this.apiEth.loadData().subscribe(
      (data) => {
        data.Data.Data.forEach((item: any) => {
          const date = new Date(item.time * 1000);
          const formattedDate = date.toLocaleString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' });
          this.labels.push(formattedDate);
          this.prices.push(item.close);
        });
        this.DrawChart();
      })
  }

  DrawChart() {
    const chartElement = document.getElementById("myChart") as HTMLCanvasElement;
    if (chartElement) {
      const ctx = chartElement.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: this.labels,
            datasets: [
              {
                data: this.prices,
                label: "1 ETH",
                borderColor: "#FF6165",
                backgroundColor: "#FF6165",
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
    // }
    // );
  }
}

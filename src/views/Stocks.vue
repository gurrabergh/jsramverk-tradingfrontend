<template>
<v-app>
<h1>Marknad</h1>
<v-card dark>
<v-card-title>Aktielista</v-card-title>
 <v-simple-table class="table" dark dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Aktie
          </th>
          <th class="text-left">
            Pris
          </th>
          <th class="text-left">
            Köp
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="stocks in market"
          :key="stocks.name"
        >
          <td class="text-left">{{ stocks.name }}</td>
          <td class="text-left">{{ stocks.price }}kr</td>
          <td class="text-left"><v-btn @click="$router.push('stocks/purchase/' + stocks.name)" primary small color="orange">Köp</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    <v-btn color="gray"
              dark
              x-large
              @click="$router.push('account')" 
            >
              Tillbaka
            </v-btn>
  </v-card>
  <h1>Grafer</h1>
  <div id="graphs"></div>
</v-app>
</template>
<script>
import io from 'socket.io-client';
import stockList from '../components/stocks.js'
import Rickshaw from 'rickshaw';
import 'rickshaw/rickshaw.min.css';

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')       // Remove all non-word chars
        .replace(/--+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

export default {
  data() {
    return {
      socket: io.connect("https://trading-api.gustavbergh.me"),
      texts: '',
      saldo: 0,
      market: stockList.stocks
    }
  },
  mounted() {
    let graphs = {};
    let first = true;
    let graphContainer = document.getElementById("graphs");
    this.socket.on('connect', () => {
    });

    this.socket.on('stocks', (stocks) => {
      stockList.stocks = stocks
      this.market = stockList.stocks
      if (first) {
            var palette = new Rickshaw.Color.Palette({ scheme: 'colorwheel' });

            stocks.map((stock) => {
                let graphTitle = document.createElement("h3");

                graphTitle.textContent = stock.name;

                let graphElement = document.createElement("div");

                graphContainer.appendChild(graphTitle);
                graphContainer.appendChild(graphElement);

                let graph = new Rickshaw.Graph({
                    element: graphElement,
                    width: 500,
                    height: 300,
                    renderer: "line",
                    series: new Rickshaw.Series.FixedDuration([{
                        name: stock.name,
                        color: palette.color(),
                    }], undefined, {
                        timeInterval: 5000,
                        maxDataPoints: 400,
                        timeBase: new Date().getTime() / 1000
                    })
                });

                graph.configure({
                    width: parseInt(graphContainer.clientWidth),
                });

                new Rickshaw.Graph.Axis.Time( { graph: graph } );

                new Rickshaw.Graph.Axis.Y({
                    graph: graph,
                    orientation: 'left',
                    tickFormat: parseInt(Rickshaw.Fixtures.Number.formatKMBT)
                });

                new Rickshaw.Graph.HoverDetail({
                    graph: graph
                });

                graph.render();

                let slug = slugify(stock.name);

                graphs[slug] = {
                    name: stock.name,
                    graph: graph,
                };
            });
            first = false;
        }

        stocks.map((stock) => {
            let slug = slugify(stock.name);
            let data = {};
            
            data[stock.name] = parseFloat(stock.price);
            graphs[slug].graph.series.addData(data);
            graphs[slug].graph.render();
        });
});
  },
  methods: {
  }
}
</script>


<style scoped>

#app {
  width: 90%;
  margin: auto;
}

.v-card {
  width: 75%;
  margin: auto;
}
.table {
  margin: auto;
  opacity: 0.9;
}
td {
  text-align: left;
}

button {
  margin-top: 0;
}

.graphs div {
  padding: 2rem;
  margin: auto;
  width: 80%;
}
</style>
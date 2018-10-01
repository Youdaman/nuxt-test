<template lang="pug">
section.section
  .columns.is-mobile
    .column
    .column(v-for='(trip, i) of trips', :key='i' v-if='trip.departures.length')
      .card
        header.card-header
          p.card-header-title.has-text-grey
            | {{ trip.name }}
        .card-content
          .content
            p(v-for='dep in trip.departures')
              | Date: {{ dep.date }}
              br
              | Ship: {{ dep.ship.name }}
              br
              | Reverse: {{ dep.reverse ? 'Yes' : 'No' }}
              br
              | Guaranteed: {{ dep.guaranteed || 'N/A' }}

        //- footer.card-footer
        //-   .card-footer-item(v-html='trip.name')
  pre trips = {{ trips }}
</template>

<script lang="coffee">
import axios from 'axios'

export default {
  asyncData: ({ error }) ->
    url = 'https://graphql.datocms.com'

    body = JSON.stringify query: """
      query {
        allTrips {
          name
          departures {
            date
            reverse
            guaranteed
            ship {
              name
            }
          }
        }
      }
      """

    headers =
      'Authorization': process.env.DATO_API_TOKEN
      'Content-Type': 'application/json'
      'Accept': 'application/json'

    { data }  = await axios.post url, body, { headers }

    return { trips: data.data.allTrips }
}
</script>
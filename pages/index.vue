<template lang="pug">
section.section
  .columns.is-mobile
    .column
    .column(v-for='(trip, i) of trips', :key='i')
      .card
        header.card-header
          p.card-header-title.has-text-grey
            | {{ trip.name }}
        .card-content
          .content.has-text-centered
            | description goes here
        footer.card-footer
          .card-footer-item(v-html='trip.name')
  pre trips = {{ trips }}
</template>

<script lang="coffee">
import axios from 'axios'

export default {
  asyncData: ({ error }) ->
    # { data } = await axios.get process.env.TRIPS, { params: token: process.env.TOKEN } 
    url = "#{process.env.TRIPS}?token=#{process.env.TOKEN}"
    data = JSON.stringify
      sort: _created: -1
      # populate: 1
      # filter: published: true
    config = headers: 'Content-Type': 'application/json'
    { data} = await axios.post url, data, config
    return { trips: data.entries }
}
</script>
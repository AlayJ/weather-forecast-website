const request = require('request')

const mapCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFkaGEiLCJhIjoiY2s1cHd5dWltMGNoYTNucGFkbTg1cDhlZiJ9.VZfzOcZLF8t8x-3EANpcNA&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to map services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the location, Try again.', undefined)
        } else {
            callback(undefined,
                {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    locationName: body.features[0].place_name
                }
            )
        }
    })
}

module.exports = mapCode
export const load = async ({ url }) => {
  // query string comes in as ?q=geo:37.786971,-122.399677;u=35 optionally with an altitude as the third parameter
  const geoUri = url.searchParams.get('q')
  if (!geoUri) return;

  // apply regex for following value:
  // geo:{lat},{lng}[,{alt}][;u={u}]
  const regex = /^geo:(\-?\d+(?:\.\d+)?)\,(\-?\d+(?:\.\d+)?)(?:\,(\-?\d+(?:\.\d+)?))?(?:\;u=(\d+))?$/

  // parse geoUri
  const matches = regex.exec(geoUri);
  if (!matches) return;

  matches?.shift()

  const [lat, lng, alt, u] = matches?.map(parseFloat)
  return { lat, lng, alt, u };
};
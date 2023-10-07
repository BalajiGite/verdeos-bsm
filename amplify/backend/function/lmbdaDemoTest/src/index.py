import json

def handler(event, context):
  print('received event:')
  print(event)
  siteConnected = '{"totalSitePer":"67%", "totalReadings":"103/154", "sites":[{"id": "xyz", "name":"electrical", "color":"red", "readings":"78/121"},{"id": "xyz", "name":"electrical", "color":"red", "readings":"78/121"}]}'
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps(siteConnected)
  }
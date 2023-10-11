import json

def handler(event, context):
  print('received event:')
  print(event)
  siteConnected = '{"totalSitePer":"67%", "totalReadings":"103/154", "color":"orange", "sites":[{"id": "xyz", "name":"electrical", "color":"red", "readings":"78/121"},{"id": "xyz", "name":"electrical", "color":"red", "readings":"78/121"}]}'
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }
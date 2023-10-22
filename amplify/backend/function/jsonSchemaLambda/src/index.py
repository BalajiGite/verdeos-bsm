import json

def handler(event, context):
  print('received event:')
  print(event)
  
  #navbar 
  siteConnected = '{"totalSitePer":"67%", "totalReadings":"103/154", "color":"orange", "sites":[{"id": "xyz", "name":"Electrical", "color":"red", "readings":"78/121"},{"id": "xyz", "name":"Water", "color":"green", "readings":"121/121"},{"id": "abc", "name":"Indoor Air Quality", "color":"orange", "readings":"54/121"}]}';
  buildingType = '[{"id":"test123", "name":"Warehouse"},{"id":"test123", "name":"officespace"},{"id":"test123", "name":"Retail"}]';
  dataSources = '{"totalDataQualityPer":"86%", dataSource = [{"id":"test123", "name":"Manual Input", "percentage":"30"},{"id":"test123", "name":"DB Connector", "percentage":"50"},{"id":"test123", "name":"Retail", "percentage":"60"}]}';
  team = '[{"id":"uniqueId","name":"Keshav Agrawal", "profileImg":""},[{"id":"uniqueId","name":"Balaji Gite", "profileImg":""},[{"id":"uniqueId","name":"Pouya Ghadami", "profileImg":""}]'
  imprvRecomondation = '[{"recType":"Performance", "param":[{"name":"Implement BEE Rating", "checked":"false"},{"name":"Install Lighting Controllers", "checked":"false"}]},{"recType":"Maintanance", "param":[{"name":"Service HVAC", "checked":"false"},{"name":"Asses Procurement Criteria", "checked":"false"}]}]'
  complianceRepoting = '[{"recType":"Performance", "param":[{"name":"NABERS", "checked":"false"},{"name":"GRESB", "checked":"false"}]},{"recType":"Maintanance", "param":[{"name":"Availibility", "checked":"false"},{"name":"Breakdowns", "checked":"false"}]}]'

  #mainmenu
  dataSets = '[{"id":"uniqueId", "name": "Electrical"},{"id":"uniqueId", "name": "Emissions"}]'
  globalPortfolio = '[{"id":"uniqueId", "lat":"123.123", "long":"123.123", "name":"NSW", "color":"red", "avgPer":"60%"}, {"id":"uniqueId", "lat":"123.123", "long":"123.123", "name":"WA", "color":"red", "avgPer":"60%"}]'
  portfolioCompliance = '{"sitesConnected":"78/121", "siteEUI":"20", "siteEuiColor":"orange", "sourceEui":"49", "sourceEuiColor":"green", "trend":"13%", "trendType":"high"}'
  portfolioComplianceData =  '{"ts": ["2023-10-01", "2023-10-02", "2023-10-03", "2023-10-04", "2023-10-05", "2023-10-06"], "datasets": [{"label": "Internal Standards", "data": [85, 90, 88, 91, 87, 89]}, {"label": "Industry Standards", "data": [80, 85, 82, 88, 84, 86]}, {"label": "Performance", "data": [88, 87, 90, 89, 91, 88]}, {"label": "Target Lower", "data": [82, 84, 80, 86, 83, 85]}]}'
  energyUsageBySite = '{"labels":["AFC1", "AFC2", "AFC3","AFC4", "AFC5", "AFC6"], "data": [10,20,30,40,50,60]}'
  carbonEmmisionBySite = '{"labels":["AFC1", "AFC2", "AFC3","AFC4", "AFC5", "AFC6"], "data": [10,20,30,40,50,60]}'
  waterUsageBySite = '{"labels":["AFC1", "AFC2", "AFC3","AFC4", "AFC5", "AFC6"], "data": [10,20,30,40,50,60]}'
  totalAlarmsBySite = '{"labels":["AFC1", "AFC2", "AFC3","AFC4", "AFC5", "AFC6"], "data": [10,20,30,40,50,60]}'
  totalBreakdownBySite = '{"labels":["AFC1", "AFC2", "AFC3","AFC4", "AFC5", "AFC6"], "data": [10,20,30,40,50,60]}'
  totalovveridesBySite = '{"labels":["AFC1", "AFC2", "AFC3","AFC4", "AFC5", "AFC6"], "data": [10,20,30,40,50,60]}'
  portfolioCertification = '[{"buildingId": "123123", "building":"GFC7", "certification":"NABERS", "certificationScore":"3.5/6", "year":"2023"},{"buildingId": "123123", "building":"GFC7", "certification":"NABERS", "certificationScore":"3.5/6", "year":"2023"}]'
  totalPropertiesByNABERSRating = '{"one":"10", "two": "20", "three":"25", "four":"35", "five":"30", "six":"10"}'
  totalPropertiesByGreenStarRating = '{"one":"10", "two": "20", "three":"25", "four":"35", "five":"30", "six":"10"}'
  totalPropertiesByStateRating = '["nsw":{"lat":"12.235", "long":"123.545", "propertiesCount":"30.26"}, "wa":{"lat":"12.235", "long":"123.545", "propertiesCount":"30.26"}, "act":{"lat":"12.235", "long":"123.545", "propertiesCount":"30.26"}]'

  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }
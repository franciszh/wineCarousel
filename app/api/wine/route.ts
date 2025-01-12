
 import wineApiData from './data.json'
 
 export async function GET() {
  return Response.json(wineApiData, {status: 200})
}
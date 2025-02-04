import { RequestLike } from 'itty-router';
import { mulberry32 } from '../../utils/randomInteger/';


const Conflicts = (request: RequestLike) => {
  const { id } = request.params;

  const random = mulberry32(parseInt(id, 10));

  const body = JSON.stringify({
    conflicts: random() * 20 > 18
  });

  return new Response(body, {
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Max-Age': '86400'
    }
  });
};

export default Conflicts;

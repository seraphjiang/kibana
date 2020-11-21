src/server/index_patterns/service/lib/es_api.js
import { convertEsError } from './errors';

/**
 *  Call the index.getAlias API for a list of indices.
 *
 *  If `indices` is an array or comma-separated list and some of the
 *  values don't match anything but others do this will return the
 *  matches and not throw an error.
 *
 *  If not a single index matches then a NoMatchingIndicesError will
 *  be thrown.
 *
 *  @param  {Function} callCluster bound function for accessing an es client
 *  @param  {Array<String>|String} indices
 *  @return {Promise<IndexAliasResponse>}
 */
export async function callIndexAliasApi(callCluster, indices) {
  try {
    return await callCluster('indices.getAlias', {
      index: indices,
      ignoreUnavailable: true,
      allowNoIndices: false
    });
  } catch (error) {
    throw convertEsError(indices, error);
  }
}

/**
 *  Call the fieldCaps API for a list of indices.
 *
 *  Just like callIndexAliasApi(), callFieldCapsApi() throws
 *  if no indexes are matched, but will return potentially
 *  "partial" results if even a single index is matched.
 *
 *  @param  {Function} callCluster bound function for accessing an es client
 *  @param  {Array<String>|String} indices
 *  @return {Promise<FieldCapsResponse>}
 */
export async function callFieldCapsApi(callCluster, indices) {
  try {
    console.log('indices', indices, g_nodes, g_ver);
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-fieldstats-5-6.html
    if (g_ver === '5.1.1') {
      const result = await callCluster('fieldStats', {
        index: indices,
        fields: '*'
      });
      const fields = {};
      for (let field in result.indices._all.fields) {
        const kv = result.indices._all.fields[field];
        const typeStr = kv['type'];
        fields[field] = {};
        fields[field][typeStr] = {
          'type': typeStr,
          'searchable': kv.searchable,
          'aggregatable': kv.aggregatable
        };
      }
      console.log(JSON.stringify(fields));
      return { fields };
      // return { "fields": { "referer": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "_ttl": { "long": { "type": "long", "searchable": true, "aggregatable": false } }, "relatedContent.twitter:site.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "agent": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.og:type": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.og:image:width": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "xss.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.og:description": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.og:site_name.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "_size": { "integer": { "type": "integer", "searchable": true, "aggregatable": true } }, "geo.dest": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "response.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.twitter:image": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "geo.src.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.twitter:card": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "geo.coordinates.lon": { "float": { "type": "float", "searchable": true, "aggregatable": true } }, "utc_time": { "date": { "type": "date", "searchable": true, "aggregatable": true } }, "clientip": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.og:image:height": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "host": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "machine.ram": { "long": { "type": "long", "searchable": true, "aggregatable": true } }, "links": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "geo.dest.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "host.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "machine.os.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "_version": { "_version": { "type": "_version", "searchable": false, "aggregatable": false } }, "_timestamp": { "date": { "type": "date", "searchable": true, "aggregatable": true } }, "phpmemory": { "long": { "type": "long", "searchable": true, "aggregatable": true } }, "referer.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.og:title.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "_routing": { "_routing": { "type": "_routing", "searchable": true, "aggregatable": false } }, "relatedContent.twitter:card.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "geo.coordinates.lat": { "float": { "type": "float", "searchable": true, "aggregatable": true } }, "relatedContent.twitter:title.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "ip": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.article:modified_time": { "date": { "type": "date", "searchable": true, "aggregatable": true } }, "relatedContent.og:image": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "index": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.url": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "index.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.og:description.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.article:tag": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.og:type.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "spaces": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "headings": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "clientip.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "_source": { "_source": { "type": "_source", "searchable": false, "aggregatable": false } }, "_id": { "_id": { "type": "_id", "searchable": true, "aggregatable": false } }, "_uid": { "_uid": { "type": "_uid", "searchable": true, "aggregatable": true } }, "request": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "extension": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "memory": { "long": { "type": "long", "searchable": true, "aggregatable": true } }, "_index": { "_index": { "type": "_index", "searchable": true, "aggregatable": true } }, "relatedContent.url.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.twitter:description": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.twitter:site": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.og:url": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "@tags.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "headings.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "_all": { "_all": { "type": "_all", "searchable": true, "aggregatable": false } }, "machine.os": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "_parent": { "_parent": { "type": "_parent", "searchable": false, "aggregatable": true } }, "relatedContent.article:section": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "agent.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.og:url.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.article:tag.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "extension.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.og:image:height.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "ip.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "xss": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.twitter:description.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.og:title": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "geo.srcdest": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.twitter:image.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "@tags": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.og:image:width.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "geo.srcdest.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "_type": { "_type": { "type": "_type", "searchable": true, "aggregatable": true } }, "request.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "geo.src": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "url": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "@message.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "url.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.og:site_name": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "relatedContent.twitter:title": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "@message": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "@timestamp": { "date": { "type": "date", "searchable": true, "aggregatable": true } }, "_field_names": { "_field_names": { "type": "_field_names", "searchable": true, "aggregatable": false } }, "bytes": { "long": { "type": "long", "searchable": true, "aggregatable": true } }, "response": { "text": { "type": "text", "searchable": true, "aggregatable": false } }, "links.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.og:image.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "relatedContent.article:published_time": { "date": { "type": "date", "searchable": true, "aggregatable": true } }, "relatedContent.article:section.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } }, "spaces.keyword": { "keyword": { "type": "keyword", "searchable": true, "aggregatable": true } } } }
    }
    return await callCluster('fieldCaps', {
      index: indices,
      fields: '*',
      ignoreUnavailable: true,
      allowNoIndices: false
    });
  } catch (error) {
    console.log(error);
    throw convertEsError(indices, error);
  }
}
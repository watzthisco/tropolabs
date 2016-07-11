/*
 * Tropo Learning Lab - Call Screening
 * Level: Intermediate
 * To Test: Configure keys and send SMS message to 586-232-5968
*/

<?php

$token = '752613247807729664-h6qiah86XMpRLMwi61YXE1p2ADn28q2';
$token_secret = '3mC601hdZzOC8ouA1UJZLlC9KJ79hewHVag4dRE0dZTvp';
$consumer_key = 'HgHzgJ8zLQihhANv6NG5epHPU';
$consumer_secret = 'nTW8bZm3Jclbkpg90gvHKZ371YhBL6fN8h14MaYUXSamgIncGg';

$host = 'api.twitter.com';
$method = 'POST';
$path = '/1.1/statuses/update.json'; // api call path
$url = "https://$host$path";

$query = array( // query parameters
    'status' => $currentCall->initialText
);

$oauth = array(
    'oauth_consumer_key' => $consumer_key,
    'oauth_token' => $token,
    'oauth_nonce' => (string)mt_rand(), // a stronger nonce is recommended
    'oauth_timestamp' => time(),
    'oauth_signature_method' => 'HMAC-SHA1',
    'oauth_version' => '1.0'
);

$oauth = array_map("rawurlencode", $oauth); // must be encoded before sorting
$query = array_map("rawurlencode", $query);

$arr = array_merge($oauth, $query); // combine the values THEN sort

asort($arr); // secondary sort (value)
ksort($arr); // primary sort (key)

// http_build_query automatically encodes, but our parameters
// are already encoded, and must be by this point, so we undo
// the encoding step
$querystring = urldecode(http_build_query($arr, '', '&'));

// mash everything together for the text to hash
$base_string = $method."&".rawurlencode($url)."&".rawurlencode($querystring);

// same with the key
$key = rawurlencode($consumer_secret)."&".rawurlencode($token_secret);

// generate the hash
$signature = rawurlencode(base64_encode(hash_hmac('sha1', $base_string, $key, true)));


$oauth['oauth_signature'] = $signature;
ksort($oauth); // probably not necessary, but twitter's demo does it

// also not necessary, but twitter's demo does this too
function add_quotes($str) { return '"'.$str.'"'; }
$oauth = array_map("add_quotes", $oauth);

// this is the full value of the Authorization line
$auth = "OAuth " . urldecode(http_build_query($oauth, '', ', '));

$options = array( CURLOPT_HTTPHEADER => array("Authorization: $auth"),
                  CURLOPT_POSTFIELDS => $querystring,
                  CURLOPT_HEADER => false,
                  CURLOPT_URL => $url,
                  CURLOPT_RETURNTRANSFER => true,
                  CURLOPT_SSL_VERIFYPEER => false);

// Finally!
$feed = curl_init();
curl_setopt_array($feed, $options);
$json = curl_exec($feed);
curl_close($feed);


?>
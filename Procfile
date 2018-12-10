web: node cluster.js
release: node_modules/.bin/fastly purge-all -k $FASTLY_TOKEN -s $FASTLY_SERVICE | tee /dev/stderr | grep -q 'All content purged'

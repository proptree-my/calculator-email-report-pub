```
aws dynamodb --endpoint-url http://localhost:8042 create-table --table-name property-listing \
--attribute-definitions \
  AttributeName=listingId,AttributeType=S \
  AttributeName=listingName,AttributeType=S \
--key-schema \
  AttributeName=listingId,KeyType=HASH \
  AttributeName=listingName,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

```
aws dynamodb put-item --endpoint-url http://localhost:8042 --table-name property-listing \
  --item '{"listingId": {"S": "1"}, "listingName": {"S": "Listing no 1"}}' \
   --condition-expression "attribute_not_exists(listingId)"
```

```
aws dynamodb get-item --endpoint-url http://localhost:8042 --table-name property-listing \
  --key '{"listingId": {"S": "1"}, "listingName": {"S": "Listing no 1"}}'
```

```
aws dynamodb scan --endpoint-url http://localhost:8042 --table-name property-listing 
```
build
```bash
docker build . -t ctnelson1997/cs571-s24-hw8-api
docker push ctnelson1997/cs571-s24-hw8-api
```

run
```bash
docker pull ctnelson1997/cs571-s24-hw8-api
docker run --name=cs571_s24_hw8_api -d --restart=always -p 58108:58108 -v /cs571/s24/hw8:/cs571 ctnelson1997/cs571-s24-hw8-api
```

run fa
```bash
docker pull ctnelson1997/cs571-s24-hw8-api
docker run --name=cs571_fa_s24_hw8_api -d --restart=always -p 59108:58108 -v /cs571_fa/s24/hw8:/cs571 ctnelson1997/cs571-s24-hw8-api
```
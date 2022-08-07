# Moving Balls

#### HTMLCanvasElement로 공 충돌 애니메이션을 만들어보자!

## How to start

빌드 도구 Vite를 사용한 프로젝트입니다.

- dependency 설치

```
npm install
```

- 개발 모드 실행

```
npm run dev
```

- 빌드 실행

```
npm run build
```

- 프리뷰 실행

```
npm run preview
```

## Features

- **Moving Balls**
  <br>
  <img width="480" alt="moving_balls" src="https://user-images.githubusercontent.com/54696956/183310279-cda42b5b-0da8-4e20-bd18-ed0b7b7c1bdf.gif">

1. requestAnimationFrame 사용하여 프레임 루프 구현
2. HTMLCanvasElement 사용하여 화면 구현(canvas 사이즈 - 가로1000, 세로500)
3. 10~20개의 공이 랜덤한 위치에 생성
4. 10~20px 사이의 랜덤한 반지름으로 공 생성
5. 0~360도 사이의 랜덤한 각도로 공이 날아감
6. 200 ~ 400px/s 사이의 랜덤한 속도 부여, 랜덤하게 정해진 공의 속도는 일정
7. 벽과 부딪힐 경우 반사각으로 튕겨 나감
8. 공과 공이 부딪힐 경우 반사각으로 튕겨 나감

## ⚠️ Requirement

최신 Chrome Browser 사용에 맞춰 구현되었습니다.
<br>

## Skills

### Client

- typescript

### Test

- jest
- ts-jest

### Etc

- vite : 빠른 빌드 도구
- uuid : 공 인스턴스의 고유한 id 생성

<br>

## Challenge

#### OOP

객체 지향 프로그래밍 방식으로 논리를 구성하기 위해 관심사별로(Ball, Position, Canvas, Store) 분리하여 class를 작성했습니다. 같은 종류를 묶어 속성과 동작을 추가하고, 해당 값을 사용하는 곳에서 명확하게 어떤 동작을 하는지 파악할 수 있도록 구성하려고 노력했습니다. 여러 개의 공이 화면에 그려져야 하기 때문에 Ball을 class로 만들고, 인스턴스를 여러 개 생성하여 속도, 방향, 컬러 등 속성이 모두 다르게 구현하였습니다. 또한, 자주 계산을 수행하여 업데이트해야 하는 x, y 좌표의 값을 속성으로 가지고 x, y 좌표를 계산하는 동작(좌표 더하기, 빼기, 두 점 사이 거리 구하기)을 가지는 Position class를 사용하여 추상화를 진행했습니다.
<br>

#### 공 속도 계산과 requestAnimationFrame 그리고 충돌

200~400px/s의 랜덤한 속도로 애니메이션을 실행하기 위해 x, y velocity를 계산하는 함수를 구현했습니다. 자연스러운 애니메이션을 보여주기 위해서는 16ms안에 화면을 업데이트 해야하는데 보통 1초에 60프레임을 그려냅니다. 그렇다면 1초 안에 200 ~ 400px 사이로 공이 움직여야 하기 때문에 16ms 주기의 1frame 당 3.3px ~ 6.6px을 이동해야 합니다. requestAnimationFrame의 콜백 함수는 보통 1초에 60번을 기준으로 호출되지만 W3C 권장을 따르는 대부분의 웹브라우저에서는 디스플레이의 refesh rate 즉, 주사율 Hz를 따른다고 합니다. 60Hz를 지원하는 모니터를 사용하는 브라우저에서 requestAnimationFrame는 60 frame per second를 기준으로 콜백 함수를 호출합니다. 하지만 100Hz를 지원하는 모니터에서는 100번이 호출됩니다. 모든 환경에서 200 ~ 400 px/s의 속도를 갖기 위해 애니메이션을 실행시키는 콜백 함수를 16ms 마다 실행하도록 코드를 작성하여 1초에 60프레임을 그려낼 수 있게 구성했습니다. 또한, 각각의 공은 랜덤 방향, 속도를 가져야하기 때문에 동적으로 이동할 좌표를 계산하는 함수를 활용하여 이동할 거리를 공마다 다르게 주입해주었습니다. x축으로의 이동 거리와 y축으로의 이동 거리를 활용하여 두 점 사이의 거리를 구해서 해당 px만큼 움직이게 됩니다.
<br>
<img width="480" alt="distance_of_two_points" src="https://user-images.githubusercontent.com/54696956/183312774-bd2c1839-c03c-4939-813e-36859d3065ab.png">
<br>
공 충돌 계산 또한 위의 두 점 사이의 거리 공식을 사용하여 하나의 공을 기준으로 모든 공을 순회하면서 중심점의 거리를 계산하여 지름을 고려한 거리가 맞닿을 경우 반사각으로 position을 변경하는 방식으로 구현했습니다.

#### Vite

프로젝트를 진행하면서 빠르게 서버를 구동하고 화면을 테스트하여 테스크를 완수하기 위해 처음 Vite라는 번들러로 개발 환경을 구성해보았습니다. 브라우저가 ES modules를 지원하기 때문에 일반적인 번들링 과정을 생략하게 되어 Vite는 다른 번들러보다 빠르게 동작합니다. 패키지와 소스 코드를 분리하여 빌드하기 때문에 패키지는 설치 후에 내용이 바뀌지 않고, 소스 코드만 빈번하게 변경됩니다. 패키지는 esbuild로 미리 트랜스파일링을 해놓고, 로컬에서 개발 서버를 띄우면 소스 코드를 불러오면서 의존성이 있는 패키지만 가져오는 방식이라고 합니다. 또한, 한 번 빌드한 결과는 캐싱을 해두기 때문에 다음 개발 빌드 때 바로 로드가 됩니다. 물론 볼륨이 큰 프로젝트를 진행한 것은 아니었지만 Vite를 사용해서 환경을 구성해보고 싶었습니다. Vite를 사용해본 결과 프로젝트 규모상 엄청 큰 차이를 느낄 순 없었지만 체감상 webpack에 비해 속도가 조금 개선되었다고 느꼈습니다.
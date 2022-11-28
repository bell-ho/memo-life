# 메모라이프

<p align="center">
  <br>
  <img src="./images/common/logo-sample.jpeg">
  <br>
</p>

## 📒 목차

## 🔖 소개

<p align="justify">
프로젝트 개요/동기
</p>

<p align="center">
GIF Images
</p>

<br>

## 📚 기술스택

| 분야           | 사용 기술                                      | 비고 |
| -------------- |--------------------------------------------| ---- |
| FrontEnd       | React, Redux-Saga, React-Query, javascript |
| BackEnd        | Express                                    |
| Database       | MySql                                      |
| Cloud Services | AWS EC2, AWS S3                            |

<br>

## 구현 기능

### 로그인, 로그아웃
### 게시글, 댓글 기능
### 팔로우, 팔로잉 기능

<br>

## 후기
처음으로 Next.js를 적용한 프로젝트라 배우는데 시간이 좀 걸렸지만 <br>
이것저것 하고 싶은걸 많이 적용시키다보니 프로젝트가 끝날쯤엔 많이 늘어있는 모습에 뿌듯했다<br>
Redux-Saga를 써서 전역 상태관리를 할땐 props-drilling이 줄어 들어 개발하기 편하다고 생각했지만 <br>
계속 사용하다보니 상당한 코드량, 데이터 동기화의 번거로움, 비동기 데이터 상태코드 만들기 등등.. <br>
불편했던 점을 React-Query로 바꾸면서 다 개선해보니 훨씬 유지보수성이 좋은 프로젝트로 퀄리티를 올릴 수 있었다 <br>

## 작업 내역

* 11/14
  * Redux-Saga => React-Query 컨버팅 작업
* 06/27 ~ 09/08
  * 게시글 도배 방지 기능 추가
  * 게시글에서 좋아요, 댓글 갯수 출력
  * 댓글 등록시 최신 댓글 refetch 하도록 수정
  * 게시글 이미지 슬릭으로 넘기도록 ux 수정
  * 서버 배포 중지=> ~~supercola.co.kr~~
* 06/27
  * 사용자가 게시글 올리시 최신 글 목록을 refetch 하도록 수정
* 06/25
  * AWS Lambda 이미지 리사이징 구현
* 06/23
  * S3 연결
* 06/22
  * 서버 배포 => supercola.co.kr
  * 쿠키 쉐어링
* 06/21
  * 사용자 아이디 또는 해시태그로 게시판 글 구별되는 페이지 추가
  * Error 페이지 추가
  * 프로필 페이지에서 팔로잉,팔로워 목록 보여주는 기능 추가
* 06/18
  * SSR 적용
* 06/15
  * 프로필 수정 기능 추가
* 06/08
  * 팔로우나 언팔로우 버튼 클릭시 동시에 화면에 있는 모든 버튼 spinner 되는 버그 => 하나의 버튼 클릭시 하나만 spinner 되도록 수정
* 06/07
  * 회원 공개 게시글 목록 무한 스크롤링 적용
  * 팔로우, 언팔로우 기능 구현
* 06/03
  * 게시글, 댓글 Saga 적용
* 05/31
  * Redux-Saga 적용
  * 로그인, 로그아웃 Saga 적용
* 05/30
  * Redux 적용
  * 게시글,댓글,이미지 - 추가/수정/삭제 기능 구현
* 05/27
  * 로그인 로그아웃 구현
* 05/25
  * next.js 적용
* 05/28
  * 회원가입 기능 구현

<!-- Stack Icon Refernces -->

[js]: /images/stack/javascript.svg
[ts]: /images/stack/typescript.svg
[react]: /images/stack/react.svg
[node]: /images/stack/node.svg

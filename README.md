# 메모라이프

<p align="center">
  <img src="https://user-images.githubusercontent.com/62537935/224707418-ffce9274-7a11-474a-8ba9-2409b87d2f8f.png">
</p>

## 🔖 소개
> **일상 생활속 나만의 메모를 공유하는 프로젝트**

![ANY_0313222123](https://user-images.githubusercontent.com/62537935/224714292-58f4f970-80bd-4503-ad65-867b5549d60a.gif)

<br>

## 구현 기능

### 로그인, 로그아웃
### 게시글, 댓글 기능
### 팔로우, 팔로잉 기능
### 외침 기능

<br>

## 📚 기술스택

| 분야           | 사용 기술                                      | 비고 |
| -------------- |--------------------------------------------| ---- |
| FrontEnd       | React, Redux-Saga, React-Query, javascript |
| BackEnd        | Express                                    |
| Database       | MySql                                      |
| Cloud Services | ~~AWS EC2, AWS S3~~                            |

<br>

## 작업 내역
* 11/29
  * express => JPA 포팅 예정
* 11/28
  * 댓글 좋아요 기능 개발
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

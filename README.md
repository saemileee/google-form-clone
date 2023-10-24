
## 💡 시작가이드

- **✅  로컬실행방법**

```bash
$npm i
$npm run start
```

## 💡 목표

- 디테일한 요소들과 인터랙티브한 기능들이 많은 UI를 라이브러리 없이 직접 구현하여 기능의 원리를 이해하고 라이브러리 의존성을 최소화하고자 합니다.

- 동적인 요소가 많은 폼데이터의 타입을 보다 명확하게 관리하여 런타임 시 발생할 수 있는 에러를 감소하고자 합니다.



## 💡 구현내용

- **✅ 배포 사이트**

    - https://google-form-clone-virid.vercel.app/
    

### 기본 정보 입력 기능

  <img src="https://i.postimg.cc/d39ZphSG/01.gif" alt="기본정보" width="500"/>

- **✅ 설문지 제목 추가/편집**

- **✅ 설문지 설명 추가/편집**

<br/>


### 질문 관련 기능
  - 리덕스 툴킷에 내제되어있는 immer의 속성을 고려하여 질문 인덱스를 통해 직접 객체 상태에 접근, 조작하는 방식으로 상태를 업데이트 하였습니다.

 <img src="https://i.postimg.cc/ZqDGPjbd/02.gif" alt="질문" width="500"/>


- **✅ 질문 추가**
    - 선택한 질문의 하단에 새로운 질문이 추가됩니다.

<br/>

- **✅ 드롭다운 리스트 선택**
    - 아이콘 추가를 위해 직접 드롭다운 박스를 구현하였습니다.

<br/>

- **✅ 질문 복사**
    - 선택한 질문이 복제되어 하단에 추가됩니다.

<br/>

- **✅ 질문 삭제**
    - 선택한 질문이 삭제된 후에는 바로 상단의 질문지가 자동으로 선택됩니다.

<br/>

- **✅ 필수 옵션 설정**
    - 토글 버튼과 기능으로 필수 옵션을 설정할 수 있습니다.
  

<br/>

### 질문 및 옵션 순서 변경 기능

<img src="https://i.postimg.cc/Kv28gcsy/04.gif" alt="양식 지우기" width="500"/>

- **✅ 드래그앤드롭 순서 변경 기능**
    - 마우스 이벤트로 선택한 요소의 인덱스, 현재 마우스가 위치한 요소의 인덱스를 파악하고 순서를 재정렬하는 `드래그앤 드롭 커스텀 훅을 구현`하여 해당 기능을 범용적으로 사용할 수 있게 하였습니다.
  

<br/>


### 미리보기 기능

  <img src="https://i.postimg.cc/QtGbrWSz/03.gif" alt="미리보기" width="500"/>

<br/>

- ✅ **작성한 질문 미리보기**
    - 브라우저에 저장 된 `질문지 작성 데이터를 가공`하여 미리보기 폼의 초기 상태로 할당하였습니다.
    - 이는 미리보기 페이지가 새 창으로 오픈되어도 전페이지의 데이터를 유지할 수 있게합니다.

<br/>

- **✅ 제출한 폼 확인**
    - 미리보기 폼 제출 시 작성한 폼의 상태가 브라우저 스토리지에 저장됩니다. 해당 상태와 미리보기 폼 컴포넌트를 재활용하여 제출 폼 확인 페이지를 구현하였습니다.


<br/>

## 💡 추가 구현 사항

- **✅ 양식 지우기**


  - 초기 상태값을 활용해 미리보기 페이지에서 작성한 양식을 모두 초기화할 수 있습니다.

<br/>


- **✅ 질문 데이터 저장**

    <img src="https://i.postimg.cc/3rLtkWwk/06.gif" alt="질문 데이터 저장" width="500"/>

  - 질문지 생성 시 상태가 변할 때 마다 `브라우저 스토리지에도 업데이트 된 상태를 저장`합니다.
  - 새로고침 하여도 작성중인 `데이터가 유지`됩니다.
  - 브라우저 스토리지에 저장 된 상태를 가공하여 미리보기 페이지의 초기 상태를 세팅하였으며, 실시간으로 업데이트 되는 질문지 상태는 미리보기 창에서 새로고침하여 확인할 수 있습니다.
  - 폼 제출 시 `답변 상태 또한 브라우저 스토리지에 저장`되며, 결과 페이지도 새로고침 시 유지됩니다.



<br/>

- **✅ 사용자 친화적인 UI/UX**

  <img src="https://i.postimg.cc/Prw1dqvs/07.gif" alt="사용자 친화적인 UI/UX" width="500"/>

    - `툴팁`으로 사용자는 보다 명확하게 기능을 인지할 수 있습니다.
    - 텍스트 인풋 선택 시 `전체 텍스트가 선택`되어 편리하게 수정할 수 있습니다.
    - 제출 시 필수 항목이 비어있는 경우, 비어있는 질문 중 가장 `상단의 질문으로 스크롤`합니다.
    - 옵셔널한 질문지 생성 시 다른 옵셔널 타입으로 변경할 경우에, 기존 작성한 내용을 유지합니다.
    - `마지막 임시 저장 시간을 표시`하였습니다.
  

<br/>

- **✅ 렌더링 성능 최적화**

    <img src="https://i.postimg.cc/wB29JDZK/08.gif" alt="에러핸들링" width="500"/>

    - `ErrorBoundary`활용, 브라우저 스토리지의 상태를 사용하여 새로운 상태를 만들어내는 함수에 `try catch문을 활용`하여 로컬스토리지 임의 조작, 혹은 결과 없이 result 페이지에 접근한 경우 `NotFound 컴포넌트를 렌더링`합니다.

    <img src="https://i.postimg.cc/4Nh5Hmjk/ezgif-com-video-to-gif-24.gif" alt="임시저장" width="500"/>

    - `디바운싱 임시저장 기능`으로 사용자가 폼 조작을 중단 한 후 일정 시간이 지나면 한번에 업데이트 된 상태를 저장하도록 구현하였습니다.

<br/>

## 💡 아키텍처

- **✅ 데이터 흐름**

  <img src="https://i.postimg.cc/CM6VcqRZ/google-survey.jpg" alt="데이터 흐름" width="500"/>

  1. `리덕스 저장소의 surveyBuilder`의 state로 SurveyBuilder 컴포넌트가 렌더링됩니다.
  
  2. 임시저장 시 `리덕스 저장소의 surveyBuilder 상태`는 `formBuilderStateStorage 로컬스토리지에 저장`됩니다. 
  
  3. `SurveyBuilder` 페이지 새로고침 시 빌딩 중인 폼을 유지하기 위해 로컬스토리지로 부터 캐싱 된 상태를 가져와 `surveyBuilderSlice`의 initialState로 설정합니다.
  
  4. `SurveyPreview` 새 창 오픈 시 로컬스토리지로 부터 저장 된 상태를 가져와 가공하여 `surveyPreviewSlice`의 initialState로 설정합니다.
  
  5. `리덕스 저장소의 surveyPreview`의 state로 SurveyPreview 컴포넌트가 렌더링됩니다.
  
  6. 폼 제출 시 `리덕스 저장소의 surveyPreview 상태`는 `formResultStateStorage 로컬스토리지에 저장`됩니다.

  7. `SurveyResult` 페이지 전환 시 로컬스토리지로 부터 저장 된 상태를 받아와 `SurveyResult` 컴포넌트가 렌더링 됩니다.

<br/>

- **✅ 컴포넌트 구조**
  - SurveyBuilder 페이지

    <img src="https://i.postimg.cc/pLVjB44Y/Frame-6.jpg" alt="SurveyBuilder" width="500"/>

  - SurveyPreview 페이지

    <img src="https://i.postimg.cc/wBL9RT2W/Frame-7.jpg" alt="SurveyPreview" width="500"/>

  - SurveyResult 페이지

    <img src="https://i.postimg.cc/Xq7WPKbh/Frame-8.jpg" alt="SurveyResult" width="500"/>

  - 전체적인 구조는 폼 전체의 타이틀, 설명이 들어가는 BasicInfo 컴포넌트와 질문지 리스트가 들어가는 QuestionList 컴포넌트로 구분 하였습니다.
  - SurveyBuilder의 질문지 설정 부분은 Question Type 설정에 따라 크게 텍스트타입, 옵셔널 타입으로 구분하였습니다. 옵셔널 타입은 OptionList 컴포넌트가 렌더링되며, 해당 컴포넌트 내에서도 타입에 따라 옵션 앞 아이콘과 Other 옵션 선택 여부가 결정됩니다.
  - 인풋 기능 외 부가적인 이벤트가 할당되지 않는 SurveyPreview 페이지와 SurveyResult 페이지 내 인풋 컴포넌트들은 재사용할 수 있도록 공통 컴포넌트화하였습니다.
  
<br/>

- **✅ 인터페이스**
  
  - 작은 단위의 타입에서 부터 Option -> Question -> Form 인터페이스로 확장해 나가며 상태의 무결성과 안정성을 최대한 유지하고자 하였습니다.
  - QuestionType별로 Question의 인터페이스를 지정하였으며, 공통적인 특징을 갖고 있는 유형 별로 묶어 유니온 타입을 만들어 활용하였습니다.



<br/>

## 💡 라이브러리

`react`

`create-react-app`

`typescript`

`redux`

`redux-toolkit`

`styled-components`

`eslint`

`prettier`

`react-uuid`

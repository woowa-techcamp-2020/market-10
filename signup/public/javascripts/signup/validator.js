import {
  emailValidator,
  idValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from "/validator/index.js";

function retypePwValidator(retypePW) {
  const pw = document.getElementById("userPW").value;
  return pw === retypePW;
}

function validateId(target) {
  const { value } = target;
  let msg = "";
  let state = "error";
  if (value.length === 0) {
    msg = "아이디를 입력해주세요.";
  } else if (!idValidator(value)) {
    msg = "아이디는 영문과 숫자로 4자~20자 사이로 입력해 주세요.";
  } else {
    msg = "입력하신 아이디로 사용이 가능합니다.";
    state = "success";
  }
  const infoEl = target.nextElementSibling;

  infoEl.innerText = msg;
  if (state === "error") target.classList.add("error_input");
  else {
    target.classList.remove("error_input");
    infoEl.classList.remove("error");
  }
  infoEl.classList.add(state);
}

function validatePassword(target) {
  const { value } = target;
  let msg = "";
  let error = true;
  if (value.length === 0) {
    msg = "비밀번호를 입력해주세요.";
  } else if (!passwordValidator(value)) {
    msg = "비밀번호는 영문과 숫자를 포함하여 8~20자로 입력해 주세요.";
  } else {
    error = false;
  }
  const infoEl = target.nextElementSibling;
  if (error) {
    infoEl.innerText = msg;
    target.classList.add("error_input");
    infoEl.classList.add("error");
  } else {
    infoEl.innerText = "";
    target.classList.remove("error_input");
    infoEl.classList.remove("error");
  }
}

function validateRetype(target) {
  const { value } = target;
  let msg = "";
  let error = true;
  if (value.length === 0) {
    msg = "비밀번호를 입력해주세요.";
  } else if (!retypePwValidator(value)) {
    msg = "위 비밀번호와 일치하지 않습니다. 다시 입력해 주세요.";
  } else {
    error = false;
  }
  const infoEl = target.nextElementSibling;
  if (error) {
    infoEl.innerText = msg;
    target.classList.add("error_input");
    infoEl.classList.add("error");
  } else {
    infoEl.innerText = "";
    target.classList.remove("error_input");
    infoEl.classList.remove("error");
  }
}

function validateEmail(target) {
  const { value } = target;
  let msg = "";
  let error = true;
  if (value.length === 0) {
    msg = "이메일을 입력해주세요.";
  } else {
    error = false;
  }
  const infoEl = target.parentElement.nextElementSibling;
  if (error) {
    infoEl.innerText = msg;
    target.classList.add("error_input");
    infoEl.classList.add("error");
  } else {
    infoEl.innerText = "";
    target.classList.remove("error_input");
    infoEl.classList.remove("error");
  }
}

function validateDomain(target) {
  const { value } = target;
  let msg = "";
  let error = true;
  const tempMail = "a@";
  if (value.length === 0) {
    msg = "이메일 주소를입력해주세요.";
  } else if (!emailValidator(tempMail + value)) {
    msg = "이메일 주소를확인해주세요.";
  } else {
    error = false;
  }
  const infoEl = target.parentElement.nextElementSibling;
  if (error) {
    infoEl.innerText = msg;
    target.classList.add("error_input");
    infoEl.classList.add("error");
  } else {
    infoEl.innerText = "";
    target.classList.remove("error_input");
    infoEl.classList.remove("error");
  }
}

function changeDomain(target) {
  const { value } = target;
  const domainEl = document.getElementById("domain_etc");
  if (value === "etc") {
    domainEl.removeAttribute("disabled");
  } else domainEl.value = value;
}

function validateName(target) {
  const { value } = target;
  let msg = "";
  let error = true;
  if (value.length === 0) {
    msg = "이름을 입력해주세요.";
  } else if (!nameValidator(value)) {
    msg = "이름에 특수문자, 숫자는 입력하실 수 없습니다. 다시 입력해 주세요.";
  } else {
    error = false;
  }
  const infoEl = target.nextElementSibling;
  if (error) {
    infoEl.innerText = msg;
    target.classList.add("error_input");
    infoEl.classList.add("error");
  } else {
    infoEl.innerText = "";
    target.classList.remove("error_input");
    infoEl.classList.remove("error");
  }
}

function validatePhone(target) {
  const { value } = target;
  let msg = "";
  let error = true;
  if (value.length === 0) {
    msg = "휴대폰 번호를 입력해주세요.";
  } else if (!phoneValidator(value)) {
    msg = "휴대폰 번호를 확인해 주세요.";
  } else {
    error = false;
  }
  const infoEl = target.parentElement.nextElementSibling;
  const btnRight = target.nextElementSibling;
  if (error) {
    infoEl.innerText = msg;
    target.classList.add("error_input");
    infoEl.classList.add("error");
    btnRight.classList.remove("btn_act");
  } else {
    infoEl.innerText = "";
    target.classList.remove("error_input");
    infoEl.classList.remove("error");
    btnRight.classList.add("btn_act");
  }
}

function checkOptionAgreement(target) {
  const elSection = target.closest(".section");
  elSection.classList.toggle("disabled");
}

export {
  validateId,
  validatePassword,
  validateRetype,
  validateEmail,
  validateDomain,
  changeDomain,
  validateName,
  validatePhone,
  checkOptionAgreement,
};

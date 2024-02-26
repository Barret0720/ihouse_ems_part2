/* eslint-disable no-undef */
$(document).ready(function () {
  getTypeData()
  getAlertData()
  renderOption()
})
$(function () {
  $('#datepicker').datepicker({
    dateFormat: 'yy 年 mm月',
    changeMonth: true,
    changeYear: true,
    onSelect: function (dateText, inst) {
      // 選擇 date後要做的事情
      console.log('選定日期:', dateText)
    }
  })
  $('.datepicker-icon').click(function () {
    $('#datepicker').datepicker('show')
  })
})

function getTypeData () {
  $.ajax({
    url: 'APIURL',
    method: 'GET',
    success: function (response) {
      $('#type').empty()
      $('#type').append('<option value="all">全部</option>')
      response.forEach(function (item) {
        $('#type').append(
          `<option value="${item.value}">${item.label}</option>`
        )
      })
    },
    error: function () {
      $('#type')
        .empty()
        .append('<option value="all">沒有可選類別</option>')
    }
  })
}
function getAlertData () {
  $.ajax({
    url: 'APIURL',
    method: 'GET',
    success: function (response) {
      $('.data-length').text(response.length)
      $('.alert-list').empty()
      response.forEach(function (item) {
        $('.alert-list').append(
          renderAlertInformation(item)
        )
      })
    },
    error: function () {
      $('.data-length').text('0')
      $('.alert-list')
        .empty()
        .append('<p class="fs-3">目前無告警事件</p>')
    }
  })
}
function renderOption () {
  $('#type').change(function () {
    const selectedValue = $(this).val()
    // 下拉選單變更後，要執行的
    console.log('選擇的值是：' + selectedValue)
  })
}
// alertObject {
// id:,  //錯誤事件的通知ID，設定查看要帶入的資料
//   info:, // 錯誤事件的訊息
//   time:,  //錯誤事件的時間
// }
function renderAlertInformation (alertObject) {
  return `<li class="alert-item">
      <div class="d-flex">
        <img src="./assets/img/icon_alert_circle.svg" alt="" class="me-4 img-fluid" />
        <div>
          <p class="fw-semibold text-primary mb-2">告警通知</p>
          <h3 class="fw-semibold">${alertObject.info}</h3>
          <p class="time">${alertObject.time}</p>
        </div>
      </div>
      <a href="${alertObject.id}" class="alert-link link-primary">查看 Widget<span class="material-icons"> navigate_next </span></a>
    </li>`
}

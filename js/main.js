'use stricr';

console.log('Starting up');

function initPage() {
  creatProjects();
  renderGrid();
}

function renderGrid() {
  var projs = getProjs();
  var strHtml = projs.map(function (proj) {
    return `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick ="renderProjModal('${proj.id}')" >
            <div class="portfolio-hover" >
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.id}</h4>
          </div> 
          </div> 
         `
  });
  $('.portfolio-grid').html(strHtml.join(''));
}



function renderProjModal(projId) {
  var projs = getProjs();
  var proj = getProjById(projs, projId);
  var strHtml = ` 
              <h2>${proj.id}</h2>
              <p class="item-intro text-muted">${proj.title}</p>
              <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}2.jpg" alt="">
              <p>${proj.desc}</p>
              <ul class="list-inline">
                <li>Date: ${proj.publishedAt}</li>
                <li><a href="${proj.url}" target = "_blank" >Link</a></li>
              </ul>
              <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
                  `
  $('.modal-body').html(strHtml);
}

function onSubmitClick(){
  var $email = $('#email');
  var $subject = $('#subject');
  var $message = $('#message');
  var url = `https://mail.google.com/mail/?view=cm&fs=1&to=kasim.gadban@gmail.com&su=${$subject.val()}&b
  ody=${$message.val()}`;

  if(!$email.val()) return;
  //window.location.href = `${url}`;
  window.open(url,'_blank');
  $email.val('');
  $subject.val('');
  $message.val('');
  $('.offcanvas-btn').removeClass('offcanvas-btn-open');
  $('.offcanvas-aside').removeClass('offcanvas-aside-open');
}


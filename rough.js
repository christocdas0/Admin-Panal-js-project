// serach bar
var __search__Bar = document.getElementById("search-box");
// make empty __Arrayay
// apply keyup function
  $.get(
    "https://adminpaneldata-edyoda-sourav.herokuapp.com/admin/data",
    function (url) {
      __My__All_Datas = url;
      __Table_Created(url);
    }
  );
var __My__All_Datas;
 // this __Arrayay used for store cliked id's id number
var __Array = [];
const __Table_Created = (char) => {
  const rowss = char
    .map((__Item, i) => {
      return `
            <tr id=${i} onclick="__heighlighted_Row_Fn(${i})" class="">
                  <td class="column1">${__Item.id}</td>
                  <td class="column2">${__Item.firstName}</td>
                  <td class="column3">${__Item.lastName}</td>
                  <td class="column4">${__Item.email}</td>
                  <td class="column5">${__Item.phone}</td>
                </tr>
        `;
    })
    .join("");
  t_body.innerHTML = rowss;
};
__search__Bar.addEventListener("keyup", (e) => {
  // get serach value
  const __search__Bar__Item = e.target.value.toLowerCase();
  //   filter while seraching
  const filtered__Items = __My__All_Datas.filter((__Item) => {
    return (
      __Item.firstName.toLowerCase().includes(__search__Bar__Item) ||
      __Item.lastName.toLowerCase().includes(__search__Bar__Item) ||
      __Item.email.toLowerCase().includes(__search__Bar__Item)
    );
  });
  __Table_Created(filtered__Items);
});
function __heighlighted_Row_Fn(index) {
  // get the particular row with the support of index
  var row = document.getElementById(`${index}`);
  // get that row id.
  let rowIndex = row.id;

  // check id and index is same, if same apply active class.
  if (rowIndex == index) {
    row.classList.add("active");
  }
  // get details wrapper
  var __Rows_Datas = document.getElementById("info-wrapper");
  // ger url with particulat rows
  var __Row_Deatils = __My__All_Datas[index];
  // apply all the items in correct positions
  __Rows_Datas.innerHTML = `
    <h1>Details</h1>
        <p>Click on a table item to get detailed information</p>
        <div id="info-content">
          <div><b>User selected:</b> ${__Row_Deatils.firstName}  ${__Row_Deatils.lastName}</div>
          <div>
            <b>Description: </b>
            <textarea cols="50" rows="5" readonly>
                       ${__Row_Deatils.description}
                    </textarea
            >
          </div>
          <div><b>Address:</b> ${__Row_Deatils.address.streetAddress}</div>
          <div><b>City:</b> ${__Row_Deatils.address.city}</div>
          <div><b>State:</b> ${__Row_Deatils.address.state}</div>
          <div><b>Zip:</b> ${__Row_Deatils.address.zip}</div>
        </div>
  `;

  // row heighlighted
  // store all cliked id's in sperate __Arrayay
  __Array.push(index);
  // find the secound last item in that __Arrayay.
  var prevId = __Array[__Array.length - 2];
  // then find the index and item
  var __Current_Row = document.getElementById(prevId);
  // compare if items not undefiend the remove active class.
  if (prevId !== undefined) {
    __Current_Row.classList.remove("active");
  }
  // after remove when clik again the same row , active class is gone, so we need to apply one condition here.
  if (
    __Array[__Array.length - 2] ==
    __Array[__Array.length - 1]
  ) {
    __Current_Row.classList.add("active");
  }
}



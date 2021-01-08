var crudApp = new function(){
	
	// 수강 데이터(미리 만들어진 데이터) 담을 Json 형식의 배열 만들기
	this.myClass=[
		{ID:'1', Class_Name:"운영체제", Category: '전공필수', Credit:3},
		{ID:'2', Class_Name:"컴퓨터구조론", Category: '전공선택', Credit:4},
		{ID:'3', Class_Name:"심리학의 이해", Category: '교양필수', Credit:2}
	]
	
	//선택할 수 있는 항목 미리 정의
	this.Category=['전공필수','전공선택','교양필수','교양선택'];
	
	//Table Header에 담길 데이터를 확장성을 위해 배열에 담기
	this.col=[];
	
	//위 데이터를 토대로 실제 테이블 생성해주는 메소드
	
	this.createTable = () => {
		//테이블을 만들고 데이터를 채우는 코드
		
		//col 에 table header에 해당하는 데이터 (myClass의 key 값)들을 넣어주는 코드
		//비어 있는 col 배열에 myClass 배열 속 개개체들의 key값들을 넣어줘야 함.
		
		//myClass 속 객체 순회
		for (var i=0; i< this.myClass.length;i++){
			//각 객체들 속의 key 값을 순회.
			
			for(var key in this.myClass[i]){
				//key를 col 배열에 담기
			
				//indexOf: 문자열 속의 문자열 검색
				if(this.col.indexOf(key) ===-1) this.col.push(key);
			}
		}
		
		var table = document.createElement('table');
		table.setAttribute('id', 'classTable');
		
		//tr : 새로운 행 추가
		
		var tr = table.insertRow(-1);
		
		//th 작성
		for(var h=0; h<this.col.length;h++){
			var th = document.createElement('th');
			th.innerHTML=this.col[h];
			tr.appendChild(th);
		}
		
		
		//td 작성
		for(var i =0;i<this.myClass.length;i++){
			//table에 일단 한 행 추가
			tr = table.insertRow(-1);
			for(var j =0; j<this.col.length;j++){
				var tabCell=tr.insertCell(-1)
				tabCell.innerHTML=this.myClass[i][this.col[j]];		
			}
			
			//버튼 만들기
			// Update 버튼 만들기
			
			this.td=document.createElement('td');
			tr.appendChild(this.td);
			var btnUpdate=document.createElement('input');
			btnUpdate.setAttribute('type','button');
			btnUpdate.setAttribute('value','Update');
			btnUpdate.setAttribute('id','Edit'+i);
			btnUpdate.setAttribute('style','background-color:#44CCEB');
			btnUpdate.setAttribute('onclick','crudApp.Update(this)'); //이 버튼이 클릭될 때 실행할 메소드
			this.td.appendChild(btnUpdate);
			
			//Save 버튼 만들기
			
			tr.appendChild(this.td);
			var btnSave=document.createElement('input');
			btnSave.setAttribute('type','button');
			btnSave.setAttribute('value','Save');
			btnSave.setAttribute('id','Save'+i);
			btnSave.setAttribute('style','display:none');
			btnSave.setAttribute('onclick','crudApp.Save(this)'); //이 버튼이 클릭될 때 실행할 메소드
			this.td.appendChild(btnSave);
			
			
			//Delete 버튼 만들기
			
			this.td=document.createElement('td');
			tr.appendChild(this.td);
			var btnDelete=document.createElement('input');
			btnDelete.setAttribute('type','button');
			btnDelete.setAttribute('value','Delete');
			btnDelete.setAttribute('id','Delete'+i);
			btnDelete.setAttribute('style','background-color:#ED5650');
			btnDelete.setAttribute('onclick','crudApp.Delete(this)'); //이 버튼이 클릭될 때 실행할 메소드
			this.td.appendChild(btnDelete);
		}
		
		// 입력 행 추가
		
		tr = table.insertRow(-1);
		for(var j=0; j<this.col.length;j++){
			var newCell = tr.insertCell(-1);
			if(j>=1){
				if(j==2){
					// 선택 항목 만들어 주기
					var select = document.createElement('select');
					select.innerHTML=`<option value=""></option>`;

					for(var k=0;k<this.Category.length;k++){
						select.innerHTML= select.innerHTML+
							`<option value="${this.Category[k]}">${this.Category[k]}</option>`;
					}
					newCell.appendChild(select);
				}
				else if(j==3){
					var nBox = document.createElement('input');
					nBox.setAttribute('type','number');
					nBox.setAttribute('value','');
					console.log(nBox);
					newCell.appendChild(nBox);
				}
				else{
					var tBox = document.createElement('input');
					tBox.setAttribute('type','text');
					tBox.setAttribute('value','');
					newCell.appendChild(tBox);
				}
			}
		}
		
		// Create 버튼 만들기
		
		this.td=document.createElement('td');
		tr.appendChild(this.td);
		var btnCreate=document.createElement('input');
		btnCreate.setAttribute('type','button');
		btnCreate.setAttribute('value','Create');
		btnCreate.setAttribute('id','New'+i);
		btnCreate.setAttribute('style','background-color:#207DD1');
		btnCreate.setAttribute('onclick','crudApp.CreateNew(this)'); //이 버튼이 클릭될 때 실행할 메소드
		this.td.appendChild(btnCreate);
		
		
		var div = document.getElementById('container');
		div.innerHTML='수강 관리 앱';
		div.appendChild(table);
	}
	
	
	//삭제 메소드
	this.Delete = (oButton) => {
		// console.log(oButton); // Delete 버튼이 눌린 row에 해당하는 input 태그
		var targetIdx = oButton.parentNode.parentNode.rowIndex;
		// console.log(targetIdx);
		this.myClass.splice((targetIdx-1),1);
		this.createTable();
	}
	
	this.CreateNew = (oButton) => {
		var writtenIdx = oButton.parentNode.parentNode.rowIndex;
		var trData = document.getElementById('classTable').rows[writtenIdx];
		
		var obj = {};
		
		// tr 데이터에서 td 속의 key:value 만 뽑아 obj 안에 저장
		
		for (var i =1; i <this.col.length;i++){
			var td = trData.getElementsByTagName("td")[i];
			//console.log(td);
			if(td.childNodes[0].getAttribute('type') === 'text' || td.childNodes[0].getAttribute('type') === 'number' || td.childNodes[0].tagName === 'SELECT'){
			   	var txtVal = td.childNodes[0].value;
				//console.log(txtVal);
				
				//txtVal === 우리가 실제로 입력하고 선택한 값.
				if(txtVal!=''){
					obj[this.col[i]]= txtVal;
					
				}
				else{
					obj = '';
					alert('All fields are compulsory.');
					break;
				}
				
			}
		}
		obj[this.col[0]]= this.myClass.length+1; // 자동으로 새 ID 값이 부여되어 obj의 0번 인덱스에 담긴다.
		this.myClass.push(obj);
		this.createTable();
	}
	
	
	this.Update =(oButton) => {
		var writtenIdx = oButton.parentNode.parentNode.rowIndex;
		var trData = document.getElementById('classTable').rows[writtenIdx];
		
		// 기존에 입력한 데이터 가져오기
		
		for(var i=1;i < this.col.length;i++){
			// 기존에 입력한 데이터 담은 새로운 input/select 띄우기
			if(i==2){
				var td = trData.getElementsByTagName("td")[i];
				var select= document.createElement("select");
				select.innerHTML = `<option value = "${td.innerText}">${td.innerText}</option>`;
				for (var k =0; k<this.Category.length;k++){
					select.innerHTML = select.innerHTML+
						`<option value="${this.Category[k]}">${this.Category[k]}</option>`;
				}
				td.innerText='';
				td.appendChild(select);
			}
			else if(i==3){
				var td = trData.getElementsByTagName("td")[i];
				var input = document.createElement("input");
				input.setAttribute('type','number');
				input.setAttribute('value',td.innerText);
				td.innerText='';
				td.appendChild(input);	
			}
			else{
				var td = trData.getElementsByTagName("td")[i];
				var input = document.createElement("input");
				input.setAttribute('type','text');
				input.setAttribute('value',td.innerText);
				td.innerText='';
				td.appendChild(input);
			}
		}
		
		var btnSave = document.getElementById('Save'+(writtenIdx-1));
		btnSave.setAttribute('style','display:block; background-color:#2DBF64;');
		oButton.setAttribute('style','display:none;');
	}
	
	//save 하기 - 변경된 값 저장하기
	this.Save =(oButton) => {
		var writtenIdx = oButton.parentNode.parentNode.rowIndex;
		var trData = document.getElementById('classTable').rows[writtenIdx];
		
		//새롭게 입력된 값으로 myClass 배열 갱신
		for (var i=1;i<this.col.length;i++){
			var td = trData.getElementsByTagName('td')[i];
			if(td.childNodes[0].getAttribute('type') === 'text' || 
			   td.childNodes[0].getAttribute('type') === 'number' || 
			   td.childNodes[0].tagName === 'SELECT'){
				this.myClass[writtenIdx-1][this.col[i]] = td.childNodes[0].value;
			}
		}
		
		this.createTable(); // 리프레시 하기.
	
	}
}

crudApp.createTable();

/*
var div = document.getElementById('container');
div.innerHTML="<h1>수강 관리 APP</h1>";
div.appendChile(table);

*/
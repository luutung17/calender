import './App.css';
import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function Lich() {
    const [sukienBanDau] = useState([
      {
        id: '1',
        title: 'Sự kiện 1',
        start: '2023-05-29T10:30:00',
        end: '2023-05-29T11:30:00', 
      },{
        id: '2',
        title: 'Sự kiện 2',
        start: '2023-05-28T10:30:00',
        end: '2023-05-28T11:30:00', 
      }
    ]);
    const [sukien, setSuKien] = useState(sukienBanDau);
    const [ngayTimKiem, setNgayTimKiem] = useState('');
    const [ngayHienTai, setNgayHienTai] = useState(new Date());
  
    function xuLyThayDoiNgayTimKiem(event) {
      setNgayTimKiem(event.target.value);
    }
  
    function kiemTraSuKienTrongNgay(sukien, ngay) {
      return sukien.some((suKien) => suKien.start.includes(ngay.toISOString().substring(0, 10)));
    }
  
    function xuLyTimKiemButtonClick() {
      let sukienGia = [];
      if (!kiemTraSuKienTrongNgay(sukien, new Date(ngayTimKiem))) {
        sukienGia = [
          {
            id: 'ngay-can-tim',
            title: 'Ngày cần tìm kiếm',
            start: ngayTimKiem,
            end: ngayTimKiem,
            display: 'background'
          }
        ];
      }
      setSuKien([...sukienBanDau.filter((suKien) => suKien.start.startsWith(ngayTimKiem.substring(0, 10))), ...sukienGia]);
    }
  
    return (
      <div id='calendar-container'>
        <div className="find-day">
          <label htmlFor="search-date"><p id="search">Tìm kiếm theo ngày:</p></label>
          <input type='date' value={ngayTimKiem} onChange={xuLyThayDoiNgayTimKiem}></input>
          <button id="btn-search" onClick={xuLyTimKiemButtonClick}>Tìm kiếm</button>
        </div>
  
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          events={[...sukien, {
            id: '99',
            title: 'Today',
            start: new Date().toISOString().substring(0, 10),
            end: new Date().toISOString().substring(0, 10),
            display: 'background'
          }]}
          eventContent={(eventInfo) => (
            <div className="event-info">
              <div className="event-title">{eventInfo.event.title}</div>
              <div className="event-time">{eventInfo.timeText}</div>
            </div>
          )}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridDay,dayGridYear,dayGridWeek'
          }}
        />
      </div>
    );
  }
  
  export default Lich;
  

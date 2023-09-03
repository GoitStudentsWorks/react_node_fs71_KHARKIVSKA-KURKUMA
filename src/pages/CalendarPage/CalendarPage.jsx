import CalendarToolbar from 'components/AuthorizedUserComponents/CalendarPageComponents/CalendarToolbar';
import ChosenMonth from 'components/AuthorizedUserComponents/CalendarPageComponents/ChosenMonth';
import MainLayout from 'components/AuthorizedUserComponents/MainLayout/MainLayout';
import PageLayout from '../../components/PageLayout/PageLayout';
import React, { useState } from 'react';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <PageLayout>
      <MainLayout />
      <CalendarToolbar selected={selectedDate} setSelected={setSelectedDate} />

      <ChosenMonth selectedDate={selectedDate} />
    </PageLayout>
  );
};

export default CalendarPage;

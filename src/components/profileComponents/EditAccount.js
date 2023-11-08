import React, { useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import { Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import CustomInput from '~/assets/custom/CustomInput'
import { useState, useContext } from 'react'
import { AuthContext } from '~/contexts/AuthContext'
import { updateInfoRequest } from '~/services/API/authAPI'
import { useSnackbar } from 'notistack'
import { t } from 'i18next'

export default function EditAccount() {
  const { enqueueSnackbar } = useSnackbar()
  const [submit, setSubmit] =useState(false)
  const { userCurrent, setUserCurrent } = useContext(AuthContext);
  const [user, setUser] = useState(userCurrent);

  useEffect(() => {
    if (user && user.dateOfBirth) {
      const updatedUser = { ...user };
      const birthDate = new Date(user.dateOfBirth);
      updatedUser.birthday = birthDate.getDate();
      updatedUser.monthOfBirth = birthDate.getMonth() + 1;
      updatedUser.yearOfBirth = birthDate.getFullYear();
      setUser(updatedUser);
    }
  }, [userCurrent]);

  const handleUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
    setSubmit(true)
  }
  const handleSave = async (event) => {
    if(user.birthday && user.monthOfBirth && user.yearOfBirth)
    {
      setUser({
        ...user, dateOfBirth: `${user.yearOfBirth}-${user.monthOfBirth}-${user.birthday}`
      });
    }
    console.log(user)
    event.preventDefault()
    const res = await updateInfoRequest(user)
    if (res.status === 200) {
      setUserCurrent(res.data)
      enqueueSnackbar(t('message.updateSuccess'), { variant: 'success' });
    } else {
      enqueueSnackbar("Cập nhật thất bại", { variant: 'error' });
    }
  }

  const genderSelect = [
    {
      id: 2,
      value: 2,
      label: t('label.male')
    },
    {
      id: 1,
      value: 1,
      label: t('label.female')
    }
  ]
  const birthday = []
  for (let i = 1; i <= 31; i++) {
    birthday.push({ id: i, value: i, label: i.toString() });
  }

  const monthOfBirth = []
  for (let i = 1; i <= 12; i++) {
    monthOfBirth.push({ id: i, value: i, label: `Tháng ${i}` });
  }

  const yearOfBirth = []
  for (let i = 2023; i > 1970; i--) {
    yearOfBirth.push({ id: i, value: i, label: i.toString() });
  }

  const customInputList = [
    createCustomInput(6, "userName", user.userName, handleUser),
    createCustomInput(6, "phone", user.phone, handleUser),
    createCustomInput(6, "firstName", user.firstName, handleUser),
    createCustomInput(6, "lastName", user.lastName, handleUser),
    createCustomInput(12, "address", user.address, handleUser),
    createCustomInput(3, "gender", user.gender, handleUser, true, genderSelect.map((option) => (
      <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
    ))),
    createCustomInput(3, "birthday", user.birthday, handleUser, true, birthday.map((option) => (
      <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
    ))),
    createCustomInput(3, "monthOfBirth", user.monthOfBirth, handleUser, true, monthOfBirth.map((option) => (
      <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
    ))),
    createCustomInput(3, "yearOfBirth", user.yearOfBirth, handleUser, true, yearOfBirth.map((option) => (
      <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
    )))
  ];
  return (
    <div className='paper editaccount'>
      <h2>{t('navbar.personalData')}</h2>
      <hr className='divider' />
      <FormControl className='form' component="form" onSubmit={handleSave}>
        <Grid
          container direction={{ xs: 'column', md: 'row' }}
          columnSpacing={7}
          rowSpacing={1}
        >
          {customInputList.map((customInput, index) => (
            <Grid item xs={customInput.props.xs} key={index}>{customInput}</Grid>
          ))}
          <Grid container justifyContent={{ xs: 'center', md: 'flex-end' }}  item xs={12} className='form-button'>
            <Button className='frame-button save' type='submit' variant='contained' disabled={!submit}>
              {t('common.save')}</Button>
          </Grid>
        </Grid>
      </FormControl>

    </div>
  )
}
function createCustomInput(xs, name, value, onChange, select = false, content = []) {
  return (
    <CustomInput
      id={name}
      name={name}
      size="small"
      value={value}
      title={t(`label.${name}`)}
      onChange={onChange}
      select={select}
      content={content}
      className={`element ${name}`}
      xs={xs}
    />
  );
}
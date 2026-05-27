import React, { useState } from 'react'
import { Form, Input, Select, Radio, Checkbox, Switch, Upload, message } from 'antd'
import { LeftOutlined, PlusOutlined, PaperClipOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { closeForm, addEmployee, updateEmployee } from '../../store/slices/employeeSlice'
import type { EpiActivity } from '../../types'
import './EmployeeForm.css'

const ROLES      = ['Cargo 1','Cargo 2','Cargo 3','Cargo 4']
const ACTIVITIES = ['Atividade 1','Atividade 2','Atividade 3']
const EPIS       = ['Calçado de segurança','Capacete','Luvas','Óculos de proteção']

interface EpiRowProps {
  activity: EpiActivity
  onChange: (u: EpiActivity) => void
  onAddEpi: (epi: string, ca: string) => void
}

const EpiRow: React.FC<EpiRowProps> = ({ activity, onChange, onAddEpi }) => {
  const [epi, setEpi] = useState(EPIS[0])
  const [ca,  setCa]  = useState('')
  return (
    <div className="epi-row">
      <div className="epi-row__field">
        <label className="epi-row__label">Selecione a atividade:</label>
        <Select value={activity.activity} style={{ width: '100%' }} onChange={v => onChange({ ...activity, activity: v })}
          options={ACTIVITIES.map(a => ({ value: a, label: a }))} />
      </div>
      <div className="epi-row__inline">
        <div style={{ flex: 1 }}>
          <label className="epi-row__label">Selecione o EPI:</label>
          <Select value={epi} style={{ width: '100%' }} onChange={setEpi} options={EPIS.map(e => ({ value: e, label: e }))} />
        </div>
        <div style={{ flex: 1 }}>
          <label className="epi-row__label">Informe o número do CA:</label>
          <Input value={ca} onChange={e => setCa(e.target.value)} placeholder="Ex: 9356" />
        </div>
        <button className="epi-row__add-btn" onClick={() => { if (ca.trim()) { onAddEpi(epi, ca); setCa('') } }}>
          <PlusOutlined /> Adicionar EPI
        </button>
      </div>
      {activity.epis.length > 0 && (
        <ul className="epi-row__list">
          {activity.epis.map((e, i) => <li key={i}>• {e.name} — CA: {e.ca}</li>)}
        </ul>
      )}
    </div>
  )
}

const EmployeeForm: React.FC = () => {
  const dispatch          = useAppDispatch()
  const { editingEmployee } = useAppSelector(s => s.employees)
  const isEditing         = !!editingEmployee

  const [form]    = Form.useForm()
  const [active,  setActive]  = useState(editingEmployee?.active ?? true)
  const [noEpi,   setNoEpi]   = useState(false)
  const [activities, setActivities] = useState<EpiActivity[]>(
    editingEmployee?.epiActivities?.length
      ? editingEmployee.epiActivities
      : [{ activity: 'Atividade 1', epis: [] }]
  )

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const payload = { ...values, active, epiActivities: noEpi ? [] : activities, healthCertificate: null }
      if (isEditing && editingEmployee) {
        await dispatch(updateEmployee({ ...editingEmployee, ...payload }))
        message.success('Funcionário atualizado!')
      } else {
        await dispatch(addEmployee(payload))
        message.success('Funcionário adicionado!')
      }
    } catch { message.error('Verifique os campos obrigatórios.') }
  }

  return (
    <div className="employee-form">
      <div className="employee-form__header">
        <button className="employee-form__back" onClick={() => dispatch(closeForm())} aria-label="Voltar">
          <LeftOutlined />
        </button>
        <span>{isEditing ? 'Editar Funcionário' : 'Adicionar Funcionário'}</span>
      </div>

      <div className="employee-form__body">
        <div className="employee-form__toggle-row">
          <span>O trabalhador está ativo ou inativo?</span>
          <Switch checked={active} onChange={setActive} checkedChildren="Ativo" unCheckedChildren="Inativo" />
        </div>

        <Form form={form} layout="vertical" initialValues={editingEmployee ?? {}}>
          <div className="employee-form__grid">
            <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Informe o nome' }]}>
              <Input placeholder="Nome" />
            </Form.Item>
            <Form.Item label="Sexo" name="gender">
              <Radio.Group>
                <Radio value="feminino">Feminino</Radio>
                <Radio value="masculino">Masculino</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="employee-form__grid">
            <Form.Item label="CPF" name="cpf" rules={[{ required: true, message: 'Informe o CPF' }, { pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, message: '000.000.000-00' }]}>
              <Input placeholder="000.000.000-00" />
            </Form.Item>
            <Form.Item label="Data de Nascimento" name="birthDate" rules={[{ required: true, message: 'Informe a data' }]}>
              <Input type="date" />
            </Form.Item>
          </div>
          <div className="employee-form__grid">
            <Form.Item label="RG" name="rg" rules={[{ required: true, message: 'Informe o RG' }]}>
              <Input placeholder="RG" />
            </Form.Item>
            <Form.Item label="Cargo" name="role" rules={[{ required: true, message: 'Selecione o cargo' }]}>
              <Select placeholder="Cargo" options={ROLES.map(r => ({ value: r, label: r }))} />
            </Form.Item>
          </div>
        </Form>

        <div className="employee-form__section">
          <p className="employee-form__section-title">Quais EPIs o trabalhador usa na atividade?</p>
          <Checkbox checked={noEpi} onChange={e => setNoEpi(e.target.checked)}>O trabalhador não usa EPI</Checkbox>
          {!noEpi && (
            <>
              {activities.map((act, i) => (
                <EpiRow key={i} activity={act}
                  onChange={u => setActivities(activities.map((a, j) => j === i ? u : a))}
                  onAddEpi={(e, ca) => setActivities(activities.map((a, j) =>
                    j === i ? { ...a, epis: [...a.epis, { name: e, ca }] } : a))}
                />
              ))}
              <button className="employee-form__add-activity"
                onClick={() => setActivities([...activities, { activity: 'Atividade 1', epis: [] }])}>
                + Adicionar outra atividade
              </button>
            </>
          )}
        </div>

        <div className="employee-form__section">
          <p className="employee-form__section-title">Adicione Atestado de Saúde <span style={{ fontWeight: 400, color: '#999' }}>(opcional):</span></p>
          <Upload.Dragger maxCount={1} accept=".pdf,.png,.jpg,.jpeg">
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: '#888' }}>
              <PaperClipOutlined /> Arraste ou clique para selecionar
            </p>
          </Upload.Dragger>
        </div>

        <button className="employee-form__save-btn" onClick={handleSubmit}>Salvar</button>
      </div>
    </div>
  )
}
export default EmployeeForm

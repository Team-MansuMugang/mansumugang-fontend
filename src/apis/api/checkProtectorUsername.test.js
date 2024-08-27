import checkProtectorUsername from './checkProtectorUsername';

it('보호자 ID가 존재하면 true 반환', async () => {
  const result = await checkProtectorUsername('testProtector1');
  expect(result).toBe(true);
});

it('ID가 존재하지 않으면 false 반환', async () => {
  const result = await checkProtectorUsername('kkOma_fan');
  expect(result).toBe(false);
});

it('환자 ID인 경우 false를 반환', async () => {
  const result = await checkProtectorUsername('testPatient1');
  expect(result).toBe(false);
});

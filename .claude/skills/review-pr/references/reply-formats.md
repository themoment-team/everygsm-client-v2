# EveryGSM GitHub Review Reply Formats

Use Korean replies for GitHub review comments.

## VALID: Fix Succeeded

```text
<commit> 에서 반영했습니다. 근거: <source>
```

## VALID: Fix Failed

```text
지적 사항이 타당합니다. 다만 자동 수정이 안전하지 않아 별도 작업으로 처리하겠습니다. 근거: <source>
```

## INVALID

```text
검토 결과 이 지적은 현재 프로젝트 규칙과 맞지 않아 반영하지 않았습니다.
근거: <source>
```

## PARTIAL: Accepted

```text
부분적으로 타당하다고 판단하여 <commit> 에서 반영했습니다.
```

## PARTIAL: Rejected

```text
검토 결과 이번 변경 범위에서는 적용하지 않기로 했습니다.
```

## PARTIAL: Pending

```text
검토 중입니다. 확인 후 별도로 반영 여부를 답변드리겠습니다.
```

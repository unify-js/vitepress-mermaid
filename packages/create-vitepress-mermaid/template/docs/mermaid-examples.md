# Mermaid Diagram Examples

This page demonstrates various Mermaid diagram types supported by vitepress-mermaid. Click on any diagram to open fullscreen preview.

## Flowchart

```mermaid
flowchart TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>Bob: Hi Bob, how are you?
    Bob-->>Alice: Great!
    Alice-)Bob: See you later!
```

## Class Diagram

```mermaid
classDiagram
    class Animal {
        +String name
        +makeSound()
    }
    class Dog {
        +fetch()
    }
    class Cat {
        +climb()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Running : start
    Running --> Paused : pause
    Paused --> Running : resume
    Running --> Idle : stop
    Idle --> [*] : shutdown
```

## Entity Relationship Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string name
        string email
    }
    ORDER {
        int id
        date created_at
    }
    ORDER ||--|{ LINE_ITEM : contains
```

## Gantt Chart

```mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements    :a1, 2024-01-01, 7d
    Design          :a2, after a1, 5d
    section Development
    Implementation  :a3, after a2, 14d
    Testing         :a4, after a3, 7d
```

## Pie Chart

```mermaid
pie title Distribution of Time
    "Coding" : 40
    "Meetings" : 30
    "Code Review" : 20
    "Learning" : 10
```

## Git Graph

```mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
```

## Mindmap

```mermaid
mindmap
  root((Project))
    Planning
      Requirements
      Design
    Development
      Frontend
      Backend
    Testing
      Unit Tests
      Integration Tests
```

## Timeline

```mermaid
timeline
    title Project Milestones
    2024 Q1 : Planning : Requirements gathering
    2024 Q2 : Development : Core features
    2024 Q3 : Testing : QA and bug fixes
    2024 Q4 : Release : Launch v1.0
```

## Quadrant Chart

```mermaid
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.7, 0.8]
    Campaign C: [0.5, 0.3]
```
